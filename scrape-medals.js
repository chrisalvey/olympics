// Automated medal scraper for Milano Cortina 2026 Winter Olympics
// Fetches medal data from Wikipedia and updates medals.json

const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

// Wikipedia URL for 2026 Winter Olympics medal table
const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/2026_Winter_Olympics_medal_table';

/**
 * Fetch HTML content from a URL with proper User-Agent
 */
function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Olympics-Fantasy-Bot/1.0 (https://github.com/chrisalvey/olympics; chrisalvey@users.noreply.github.com) Node.js'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

/**
 * Parse Wikipedia medal table and extract medal counts
 */
function parseMedalTable(html) {
    const $ = cheerio.load(html);
    const medals = {};

    // Find medal table - typically has class "wikitable"
    const table = $('table.wikitable').first();

    if (!table.length) {
        console.warn('Medal table not found on Wikipedia page');
        return medals;
    }

    // Parse rows
    table.find('tr').each((i, row) => {
        if (i === 0) return; // Skip header row

        const $row = $(row);
        const cells = $row.find('td, th');

        if (cells.length < 5) return; // Need at least: Rank, Country, Gold, Silver, Bronze

        // Get country name (usually in 2nd column)
        let country = $(cells[1]).text().trim();

        // Clean up country name - remove rank prefixes and footnotes
        country = country.replace(/^\d+\s*/, '').replace(/\[\w+\]/g, '').trim();

        // Try to get from link if available (more reliable)
        const link = $(cells[1]).find('a').first();
        if (link.length) {
            country = link.text().trim();
        }

        // Skip invalid/empty country names or totals row
        if (!country || country.toLowerCase().includes('total')) return;

        // Get medal counts
        const gold = parseInt($(cells[2]).text().trim()) || 0;
        const silver = parseInt($(cells[3]).text().trim()) || 0;
        const bronze = parseInt($(cells[4]).text().trim()) || 0;

        // Only add countries with medals
        if (gold > 0 || silver > 0 || bronze > 0) {
            medals[country] = { gold, silver, bronze };
        }
    });

    return medals;
}

/**
 * Merge new medal data with existing medals.json
 * Preserves countries that aren't in the new data
 */
function mergeMedals(existingMedals, newMedals) {
    const merged = { ...existingMedals };

    // Update countries that have won medals
    Object.keys(newMedals).forEach(country => {
        merged[country] = newMedals[country];
    });

    return merged;
}

/**
 * Main scraper function
 */
async function scrapeMedals() {
    console.log('='.repeat(80));
    console.log('MEDAL SCRAPER - Milano Cortina 2026 Winter Olympics');
    console.log('='.repeat(80));
    console.log();

    try {
        // Fetch Wikipedia page
        console.log(`📡 Fetching data from Wikipedia...`);
        console.log(`   URL: ${WIKIPEDIA_URL}`);
        const html = await fetchHTML(WIKIPEDIA_URL);
        console.log(`   ✓ Page fetched successfully`);
        console.log();

        // Parse medal table
        console.log('📊 Parsing medal table...');
        const scrapedMedals = parseMedalTable(html);
        const medalCount = Object.keys(scrapedMedals).length;
        console.log(`   ✓ Found ${medalCount} countries with medals`);
        console.log();

        if (medalCount === 0) {
            console.log('⚠️  No medals found. Olympics may not have started yet.');
            console.log('   Keeping existing medal data.');
            return;
        }

        // Load existing medals.json
        console.log('📖 Loading existing medals.json...');
        let medalsData;
        try {
            medalsData = JSON.parse(fs.readFileSync('medals.json', 'utf-8'));
        } catch (error) {
            console.log('   ⚠️  Could not read medals.json, creating new structure');
            medalsData = { medals: {}, metadata: {} };
        }

        // Ensure all countries from countries.json exist in medals
        let countriesData = [];
        try {
            countriesData = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));
            console.log(`   ✓ Loaded ${countriesData.length} countries from countries.json`);
        } catch (error) {
            console.log('   ⚠️  Could not read countries.json');
        }

        // Initialize all countries with 0 medals if they don't exist
        countriesData.forEach(country => {
            if (!medalsData.medals[country.name]) {
                medalsData.medals[country.name] = { gold: 0, silver: 0, bronze: 0 };
            }
        });

        // Merge scraped data with existing data
        console.log();
        console.log('🔄 Merging medal data...');
        medalsData.medals = mergeMedals(medalsData.medals, scrapedMedals);

        // Update metadata
        const totalMedals = Object.values(medalsData.medals).reduce((sum, m) =>
            sum + m.gold + m.silver + m.bronze, 0
        );

        medalsData.metadata = {
            lastUpdated: new Date().toISOString(),
            totalMedalsAwarded: totalMedals,
            source: 'Wikipedia'
        };

        console.log(`   ✓ Total medals awarded: ${totalMedals}`);
        console.log();

        // Write updated medals.json
        console.log('💾 Writing updated medals.json...');
        fs.writeFileSync('medals.json', JSON.stringify(medalsData, null, 2));
        console.log('   ✓ File saved successfully');
        console.log();

        // Show top 10 countries
        console.log('='.repeat(80));
        console.log('TOP 10 COUNTRIES BY TOTAL MEDALS');
        console.log('='.repeat(80));

        const sortedCountries = Object.entries(medalsData.medals)
            .map(([name, medals]) => ({
                name,
                ...medals,
                total: medals.gold + medals.silver + medals.bronze
            }))
            .filter(c => c.total > 0)
            .sort((a, b) => {
                if (b.total !== a.total) return b.total - a.total;
                if (b.gold !== a.gold) return b.gold - a.gold;
                if (b.silver !== a.silver) return b.silver - a.silver;
                return b.bronze - a.bronze;
            })
            .slice(0, 10);

        sortedCountries.forEach((country, index) => {
            const rank = index + 1;
            const emoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '  ';
            console.log(`   ${emoji} ${String(rank).padStart(2)}. ${country.name.padEnd(25)} G:${String(country.gold).padStart(2)} S:${String(country.silver).padStart(2)} B:${String(country.bronze).padStart(2)} (Total: ${country.total})`);
        });

        console.log();
        console.log('='.repeat(80));
        console.log('✅ MEDAL SCRAPER COMPLETED SUCCESSFULLY');
        console.log('='.repeat(80));
        console.log();

    } catch (error) {
        console.error('❌ Error scraping medals:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    scrapeMedals();
}

module.exports = { scrapeMedals };
