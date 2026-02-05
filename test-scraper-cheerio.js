// Test scraper using cheerio (more robust HTML parser)
const https = require('https');
const cheerio = require('cheerio');

const TEST_URL = 'https://en.wikipedia.org/wiki/2022_Winter_Olympics_medal_table';

// Country name mapping to handle Wikipedia vs IOC naming differences
const COUNTRY_NAME_MAPPING = {
    'Czechia': 'Czech Republic',
    'Korea': 'South Korea',
    'Republic of Korea': 'South Korea',
    'United Kingdom': 'Great Britain',
    'Team GB': 'Great Britain',
    'ROC': 'Individual Neutral Athletes',
    'Russian Olympic Committee': 'Individual Neutral Athletes',
    'Taiwan': 'Chinese Taipei'
};

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

function parseMedalTable(html) {
    const $ = cheerio.load(html);
    const medals = {};

    // Find medal table - typically has class "wikitable" and contains "Gold", "Silver", "Bronze" headers
    const table = $('table.wikitable').first();

    if (!table.length) {
        console.warn('Medal table not found');
        return medals;
    }

    // Parse rows
    table.find('tr').each((i, row) => {
        if (i === 0) return; // Skip header row

        const $row = $(row);
        const cells = $row.find('td, th');

        if (cells.length < 5) return;

        // Get country name (usually in 2nd column)
        let country = $(cells[1]).text().trim();

        // Clean up country name
        country = country.replace(/^\d+\s*/, '').replace(/\[\w+\]/g, '').trim();

        // Try to get from link if available
        const link = $(cells[1]).find('a').first();
        if (link.length) {
            country = link.text().trim();
        }

        // Normalize country name using mapping (handle IOC vs Wikipedia naming differences)
        country = COUNTRY_NAME_MAPPING[country] || country;

        // Skip invalid/empty country names or totals row
        if (!country || country.toLowerCase().includes('total')) return;

        // Get medal counts
        const gold = parseInt($(cells[2]).text().trim()) || 0;
        const silver = parseInt($(cells[3]).text().trim()) || 0;
        const bronze = parseInt($(cells[4]).text().trim()) || 0;

        if (gold > 0 || silver > 0 || bronze > 0) {
            medals[country] = { gold, silver, bronze };
        }
    });

    return medals;
}

async function testScraper() {
    console.log('='.repeat(80));
    console.log('SCRAPER TEST - Using Cheerio with 2022 Olympics Data');
    console.log('='.repeat(80));
    console.log();

    try {
        console.log(`📡 Fetching test data from Wikipedia...`);
        const html = await fetchHTML(TEST_URL);
        console.log(`   ✓ Page fetched (${Math.round(html.length / 1024)}KB, ${html.length} bytes)`);
        console.log();

        if (html.length < 1000) {
            console.log('⚠️  HTML response is suspiciously small');
            console.log('First 500 chars:', html.substring(0, 500));
            console.log();
        }

        console.log('📊 Parsing medal table...');
        const medals = parseMedalTable(html);
        const medalCount = Object.keys(medals).length;
        console.log(`   ✓ Found ${medalCount} countries with medals`);
        console.log();

        if (medalCount === 0) {
            console.log('❌ Test failed: No medals parsed');
            return;
        }

        // Show top 10
        console.log('='.repeat(80));
        console.log('TOP 10 COUNTRIES (2022 Olympics)');
        console.log('='.repeat(80));

        const sortedCountries = Object.entries(medals)
            .map(([name, m]) => ({
                name,
                ...m,
                total: m.gold + m.silver + m.bronze
            }))
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
        console.log('✅ SCRAPER TEST PASSED - Cheerio works!');
        console.log('='.repeat(80));
        console.log();

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testScraper();
