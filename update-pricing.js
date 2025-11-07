// Script to update country pricing based on 2018/2022 Winter Olympics historical data
const fs = require('fs');
const path = require('path');

// Medal point values (same as game scoring)
const MEDAL_POINTS = {
    gold: 3,
    silver: 2,
    bronze: 1
};

// Pricing configuration
const SCALING_FACTOR = 4.5;
const MINIMUM_PRICE = 3;
const ELITE_BONUS = 2; // Extra points for top 3 performers

// Read CSV file
function parseCSV(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',');

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
            row[header.trim()] = values[index].trim();
        });
        data.push(row);
    }

    return data;
}

// Calculate total historical points for each country
function calculateHistoricalPoints(csvData) {
    const countryPoints = {};

    csvData.forEach(row => {
        const country = row.Country;
        const gold = parseInt(row.Gold) || 0;
        const silver = parseInt(row.Silver) || 0;
        const bronze = parseInt(row.Bronze) || 0;

        const points = gold * MEDAL_POINTS.gold +
                      silver * MEDAL_POINTS.silver +
                      bronze * MEDAL_POINTS.bronze;

        if (!countryPoints[country]) {
            countryPoints[country] = {
                total: 0,
                byYear: {}
            };
        }

        countryPoints[country].total += points;
        countryPoints[country].byYear[row.Year] = {
            gold,
            silver,
            bronze,
            points
        };
    });

    return countryPoints;
}

// Combine Russia's various names (ROC, Olympic Athletes from Russia)
function combineRussiaData(countryPoints) {
    const russiaVariants = ['ROC', 'Olympic Athletes from Russia', 'Russia'];
    let russiaTotal = 0;
    const russiaByYear = {};

    russiaVariants.forEach(variant => {
        if (countryPoints[variant]) {
            russiaTotal += countryPoints[variant].total;
            Object.assign(russiaByYear, countryPoints[variant].byYear);

            // Remove the variant (we'll add unified "Russia" later)
            delete countryPoints[variant];
        }
    });

    if (russiaTotal > 0) {
        countryPoints['Russia'] = {
            total: russiaTotal,
            byYear: russiaByYear
        };
    }

    return countryPoints;
}

// Calculate draft price based on historical performance
function calculatePrice(historicalPoints, countryName, allCountries) {
    if (historicalPoints === 0) {
        return MINIMUM_PRICE;
    }

    // Base price from formula
    let price = Math.round(historicalPoints / SCALING_FACTOR);

    // Apply minimum
    price = Math.max(price, MINIMUM_PRICE);

    // Add elite tier bonus for top 3 performers
    const sortedCountries = Object.entries(allCountries)
        .sort((a, b) => b[1].total - a[1].total);

    const top3 = sortedCountries.slice(0, 3).map(c => c[0]);

    if (top3.includes(countryName)) {
        price += ELITE_BONUS;
    }

    return price;
}

// Main execution
console.log('='.repeat(80));
console.log('WINTER OLYMPICS FANTASY DRAFT - PRICING UPDATE');
console.log('='.repeat(80));
console.log();

// Read historical data
console.log('📊 Reading historical medal data from CSV...');
const csvData = parseCSV('winter_olympics_medals_2018_2022.csv');
console.log(`   Found ${csvData.length} records`);
console.log();

// Calculate points
console.log('🧮 Calculating historical performance points...');
let countryPoints = calculateHistoricalPoints(csvData);
console.log(`   Analyzed ${Object.keys(countryPoints).length} countries`);
console.log();

// Combine Russia data
console.log('🇷🇺 Combining Russia data (ROC + Olympic Athletes from Russia)...');
countryPoints = combineRussiaData(countryPoints);
if (countryPoints['Russia']) {
    console.log(`   Russia total: ${countryPoints['Russia'].total} points`);
}
console.log();

// Read current countries.json
console.log('📖 Reading current countries.json...');
const countriesData = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));
const oldPrices = {};
countriesData.forEach(country => {
    oldPrices[country.name] = country.cost;
});
console.log(`   Found ${countriesData.length} countries in current file`);
console.log();

// Calculate new prices
console.log('💰 Calculating new prices...');
const priceChanges = [];

// Update existing countries with historical data
countriesData.forEach(country => {
    const historicalPoints = countryPoints[country.name]?.total || 0;
    const newPrice = calculatePrice(historicalPoints, country.name, countryPoints);
    const oldPrice = country.cost;

    country.cost = newPrice;

    if (oldPrice !== newPrice) {
        priceChanges.push({
            name: country.name,
            oldPrice,
            newPrice,
            change: newPrice - oldPrice,
            historicalPoints
        });
    }
});

// Add Russia if not present
const hasRussia = countriesData.some(c => c.name === 'Russia');
if (!hasRussia && countryPoints['Russia']) {
    const russiaPrice = calculatePrice(countryPoints['Russia'].total, 'Russia', countryPoints);
    countriesData.push({
        name: 'Russia',
        cost: russiaPrice
    });
    priceChanges.push({
        name: 'Russia',
        oldPrice: 0,
        newPrice: russiaPrice,
        change: russiaPrice,
        historicalPoints: countryPoints['Russia'].total,
        isNew: true
    });
    console.log(`   ✓ Added Russia (${russiaPrice} points, ${countryPoints['Russia'].total} historical points)`);
}

// Sort countries alphabetically
countriesData.sort((a, b) => a.name.localeCompare(b.name));

console.log(`   Updated ${priceChanges.length} countries`);
console.log();

// Write updated countries.json
console.log('💾 Writing updated countries.json...');
fs.writeFileSync('countries.json', JSON.stringify(countriesData, null, 2));
console.log('   ✓ File saved successfully');
console.log();

// Generate detailed report
console.log('='.repeat(80));
console.log('PRICING CHANGES REPORT');
console.log('='.repeat(80));
console.log();

// Sort by biggest price increases
const increases = priceChanges.filter(c => c.change > 0).sort((a, b) => b.change - a.change);
const decreases = priceChanges.filter(c => c.change < 0).sort((a, b) => a.change - b.change);
const unchanged = countriesData.length - priceChanges.length;

console.log(`📈 PRICE INCREASES (${increases.length}):`);
console.log('-'.repeat(80));
increases.slice(0, 15).forEach(c => {
    const newTag = c.isNew ? ' [NEW]' : '';
    console.log(`   ${c.name.padEnd(30)} ${String(c.oldPrice).padStart(3)} → ${String(c.newPrice).padStart(3)} (+${c.change})  [${c.historicalPoints} hist pts]${newTag}`);
});
if (increases.length > 15) {
    console.log(`   ... and ${increases.length - 15} more`);
}
console.log();

console.log(`📉 PRICE DECREASES (${decreases.length}):`);
console.log('-'.repeat(80));
decreases.slice(0, 15).forEach(c => {
    console.log(`   ${c.name.padEnd(30)} ${String(c.oldPrice).padStart(3)} → ${String(c.newPrice).padStart(3)} (${c.change})  [${c.historicalPoints} hist pts]`);
});
if (decreases.length > 15) {
    console.log(`   ... and ${decreases.length - 15} more`);
}
console.log();

console.log(`✓ Unchanged: ${unchanged} countries`);
console.log();

// Show top 10 most expensive countries
console.log('='.repeat(80));
console.log('TOP 10 MOST EXPENSIVE COUNTRIES');
console.log('='.repeat(80));
const top10 = [...countriesData]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

top10.forEach((country, index) => {
    const historicalPoints = countryPoints[country.name]?.total || 0;
    const rank = index + 1;
    console.log(`   ${String(rank).padStart(2)}. ${country.name.padEnd(30)} ${String(country.cost).padStart(3)} points  [${historicalPoints} historical points]`);
});
console.log();

// Show pricing distribution
console.log('='.repeat(80));
console.log('PRICING DISTRIBUTION');
console.log('='.repeat(80));
const distribution = {
    'Elite (30+)': 0,
    'High (20-29)': 0,
    'Mid (15-19)': 0,
    'Low-Mid (10-14)': 0,
    'Budget (5-9)': 0,
    'Minimum (3-4)': 0
};

countriesData.forEach(country => {
    if (country.cost >= 30) distribution['Elite (30+)']++;
    else if (country.cost >= 20) distribution['High (20-29)']++;
    else if (country.cost >= 15) distribution['Mid (15-19)']++;
    else if (country.cost >= 10) distribution['Low-Mid (10-14)']++;
    else if (country.cost >= 5) distribution['Budget (5-9)']++;
    else distribution['Minimum (3-4)']++;
});

Object.entries(distribution).forEach(([tier, count]) => {
    const percentage = ((count / countriesData.length) * 100).toFixed(1);
    console.log(`   ${tier.padEnd(20)} ${String(count).padStart(3)} countries (${percentage}%)`);
});
console.log();

console.log('='.repeat(80));
console.log('✅ PRICING UPDATE COMPLETE');
console.log('='.repeat(80));
console.log();
console.log('Next steps:');
console.log('  1. Review the changes above');
console.log('  2. Test draft.html to verify prices display correctly');
console.log('  3. Commit changes to git when satisfied');
console.log();
