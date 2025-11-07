// Leaderboard functionality for Winter Olympics Fantasy Draft
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseConfig, DRAFT_DEADLINE, MEDAL_POINTS } from './config.js';
import { normalizeCountryName, validateMedals, calculateMedalPoints, createNormalizedLookup } from './utils.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let participants = [];
let medalsData = null;
let normalizedMedalsLookup = null;

// Initialize app
function init() {
    // Hide draft link banner if deadline has passed
    if (new Date() >= DRAFT_DEADLINE) {
        const draftBanner = document.querySelector('.draft-link-banner');
        if (draftBanner) {
            draftBanner.style.display = 'none';
        }
    }

    // Set up tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });

    // Load data and set up refresh
    loadData();
    setInterval(loadData, 60000);
}

async function loadData() {
    try {
        const querySnapshot = await getDocs(collection(db, 'submissions'));
        participants = [];
        querySnapshot.forEach((doc) => {
            participants.push(doc.data());
        });

        const response = await fetch(`medals.json?t=${new Date().getTime()}`);
        medalsData = await response.json();

        // Validate medals.json structure
        if (!medalsData || typeof medalsData !== 'object') {
            throw new Error('Invalid medals data format');
        }

        if (!medalsData.medals || typeof medalsData.medals !== 'object') {
            throw new Error('Missing or invalid medals object in medals.json');
        }

        // Validate and sanitize each country's medal structure
        Object.keys(medalsData.medals).forEach(country => {
            const medals = medalsData.medals[country];
            if (!medals || typeof medals !== 'object') {
                console.warn(`Invalid medal data for ${country}, resetting to zeros`);
                medalsData.medals[country] = { gold: 0, silver: 0, bronze: 0 };
            } else {
                // Ensure all medal properties exist with valid values
                if (typeof medals.gold !== 'number' || isNaN(medals.gold)) {
                    console.warn(`Invalid gold count for ${country}`);
                    medals.gold = 0;
                }
                if (typeof medals.silver !== 'number' || isNaN(medals.silver)) {
                    console.warn(`Invalid silver count for ${country}`);
                    medals.silver = 0;
                }
                if (typeof medals.bronze !== 'number' || isNaN(medals.bronze)) {
                    console.warn(`Invalid bronze count for ${country}`);
                    medals.bronze = 0;
                }
            }
        });

        // Create normalized lookup once
        normalizedMedalsLookup = createNormalizedLookup(medalsData.medals);

        renderParticipants();
        renderCountries();
        updateLastUpdated();

    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('participantsContent').innerHTML =
            `<div class="error">Error loading data: ${error.message}<br>Make sure medals.json is valid JSON.</div>`;
        document.getElementById('countriesContent').innerHTML =
            '<div class="error">Error loading data.</div>';
    }
}

function calculateScore(participantCountries) {
    let score = 0;
    let medalBreakdown = { gold: 0, silver: 0, bronze: 0 };

    participantCountries.forEach(country => {
        const normalizedCountry = normalizeCountryName(country);
        const medals = normalizedMedalsLookup[normalizedCountry];

        if (medals) {
            const validated = validateMedals(medals);
            score += calculateMedalPoints(validated);

            medalBreakdown.gold += validated.gold;
            medalBreakdown.silver += validated.silver;
            medalBreakdown.bronze += validated.bronze;
        } else {
            console.warn(`No medal data found for: "${country}"`);
        }
    });

    if (isNaN(score)) {
        console.error('Score calculation resulted in NaN for countries:', participantCountries);
        score = 0;
    }

    return { score, medalBreakdown };
}

function renderParticipants() {
    if (participants.length === 0) {
        document.getElementById('participantsContent').innerHTML =
            '<div class="empty-state">No participants yet. Be the first to submit!</div>';
        return;
    }

    const participantsWithScores = participants.map(p => {
        const { score, medalBreakdown } = calculateScore(p.countries);
        return { ...p, score, medalBreakdown };
    });

    // Sort with Olympic-standard tie-breaker rules
    participantsWithScores.sort((a, b) => {
        // Primary: Total score
        if (b.score !== a.score) return b.score - a.score;

        // Tie-breaker 1: Most gold medals (Olympic standard)
        if (b.medalBreakdown.gold !== a.medalBreakdown.gold) {
            return b.medalBreakdown.gold - a.medalBreakdown.gold;
        }

        // Tie-breaker 2: Most silver medals
        if (b.medalBreakdown.silver !== a.medalBreakdown.silver) {
            return b.medalBreakdown.silver - a.medalBreakdown.silver;
        }

        // Tie-breaker 3: Most bronze medals
        if (b.medalBreakdown.bronze !== a.medalBreakdown.bronze) {
            return b.medalBreakdown.bronze - a.medalBreakdown.bronze;
        }

        // Tie-breaker 4: Earliest submission timestamp
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeA - timeB;
    });

    // Detect if there are ties in top positions
    let hasTies = false;
    for (let i = 0; i < participantsWithScores.length - 1; i++) {
        if (participantsWithScores[i].score === participantsWithScores[i + 1].score) {
            hasTies = true;
            break;
        }
    }

    // Build tie notification message if needed
    let tieMessage = '';
    if (hasTies && participantsWithScores.length > 1) {
        tieMessage = `
            <div class="tie-breaker-notice">
                ℹ️ Tied teams are ranked by gold medals (then silver, bronze) - just like the real Olympics!
            </div>
        `;
    }

    let html = tieMessage;
    participantsWithScores.forEach((p, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';

        // Medal emojis for top 3
        let medalEmoji = '';
        if (rank === 1) medalEmoji = '🥇';
        else if (rank === 2) medalEmoji = '🥈';
        else if (rank === 3) medalEmoji = '🥉';

        html += `
            <div class="participant-card ${rankClass}">
                <div class="card-header">
                    <div class="card-rank ${rankClass}">${rank}</div>
                    <div class="card-info">
                        <div class="team-name">
                            ${medalEmoji ? `<span class="medal-emoji">${medalEmoji}</span>` : ''}
                            <span>${p.teamName}</span>
                        </div>
                        <div class="participant-name">${p.name}</div>
                    </div>
                    <div class="card-score">${p.score}</div>
                </div>
                ${p.medalBreakdown.gold + p.medalBreakdown.silver + p.medalBreakdown.bronze > 0 ? `
                    <div class="medal-row">
                        ${p.medalBreakdown.gold > 0 ? `<span class="medal-badge gold-badge">🥇 ${p.medalBreakdown.gold}</span>` : ''}
                        ${p.medalBreakdown.silver > 0 ? `<span class="medal-badge silver-badge">🥈 ${p.medalBreakdown.silver}</span>` : ''}
                        ${p.medalBreakdown.bronze > 0 ? `<span class="medal-badge bronze-badge">🥉 ${p.medalBreakdown.bronze}</span>` : ''}
                    </div>
                ` : ''}
                <div class="countries-list">${p.countries.map(country => {
                    const normalizedCountry = normalizeCountryName(country);
                    const medals = normalizedMedalsLookup[normalizedCountry];
                    let points = 0;
                    if (medals) {
                        points = calculateMedalPoints(validateMedals(medals));
                    }
                    return `${country} (${points})`;
                }).join(' • ')}</div>
            </div>
        `;
    });

    document.getElementById('participantsContent').innerHTML = html;
}

function renderCountries() {
    const countriesArray = Object.entries(medalsData.medals).map(([name, medals]) => {
        const total = medals.gold + medals.silver + medals.bronze;
        return { name, medals, total };
    });

    // Sort by total medals (desc), then by gold (desc)
    countriesArray.sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (b.medals.gold !== a.medals.gold) return b.medals.gold - a.medals.gold;
        if (b.medals.silver !== a.medals.silver) return b.medals.silver - a.medals.silver;
        return b.medals.bronze - a.medals.bronze;
    });

    // Filter to only show countries with medals
    const countriesWithMedals = countriesArray.filter(c => c.total > 0);

    if (countriesWithMedals.length === 0) {
        document.getElementById('countriesContent').innerHTML =
            '<div class="empty-state">No medals awarded yet.</div>';
        return;
    }

    let html = '';
    countriesWithMedals.forEach((country, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';

        html += `
            <div class="country-card ${rankClass}">
                <div class="country-header">
                    <div class="country-rank ${rankClass}">${rank}</div>
                    <div class="country-name">${country.name}</div>
                    <div class="country-total">${country.total}</div>
                </div>
                <div class="country-medals">
                    <div class="country-medal">
                        <span class="medal-icon gold">🥇</span>
                        <span class="medal-count">${country.medals.gold}</span>
                    </div>
                    <div class="country-medal">
                        <span class="medal-icon silver">🥈</span>
                        <span class="medal-count">${country.medals.silver}</span>
                    </div>
                    <div class="country-medal">
                        <span class="medal-icon bronze">🥉</span>
                        <span class="medal-count">${country.medals.bronze}</span>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('countriesContent').innerHTML = html;
}

function updateLastUpdated() {
    if (medalsData.metadata && medalsData.metadata.lastUpdated) {
        const date = new Date(medalsData.metadata.lastUpdated);
        document.getElementById('lastUpdated').textContent =
            `Updated: ${date.toLocaleString()}`;
    } else {
        document.getElementById('lastUpdated').textContent = '';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
