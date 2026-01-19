// Leaderboard functionality for Winter Olympics Fantasy Draft
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseConfig, DRAFT_DEADLINE } from './config.js';
import { normalizeCountryName, validateMedals, calculateMedalPoints, createNormalizedLookup } from './utils.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let participants = [];
let medalsData = null;
let normalizedMedalsLookup = null;

// Initialize app
function init() {
    if (new Date() >= DRAFT_DEADLINE) {
        const draftBanner = document.querySelector('.draft-link-banner');
        if (draftBanner) draftBanner.style.display = 'none';
    }

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });

    // Bookmark button handler
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            const pageTitle = 'Winter Olympics Fantasy - Leaderboard';
            const pageUrl = window.location.href;

            // Try modern browser bookmark API (limited support)
            if (window.sidebar && window.sidebar.addPanel) {
                // Firefox
                window.sidebar.addPanel(pageTitle, pageUrl, '');
            } else if (window.external && ('AddFavorite' in window.external)) {
                // IE
                window.external.AddFavorite(pageUrl, pageTitle);
            } else {
                // Fallback: Show instructions
                const isMac = /Mac/i.test(navigator.userAgent);
                const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
                alert(`Press ${shortcut} to bookmark this page!\n\nOr copy this URL to save:\n${pageUrl}`);
            }
        });
    }

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

        // Validate and sanitize each country's medal structure using utility function
        Object.keys(medalsData.medals).forEach(country => {
            const medals = medalsData.medals[country];
            if (!medals || typeof medals !== 'object') {
                console.warn(`Invalid medal data for ${country}, resetting to zeros`);
                medalsData.medals[country] = { gold: 0, silver: 0, bronze: 0 };
            } else {
                medalsData.medals[country] = validateMedals(medals);
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
            score += calculateMedalPoints(medals);
            medalBreakdown.gold += medals.gold;
            medalBreakdown.silver += medals.silver;
            medalBreakdown.bronze += medals.bronze;
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

    const hasTies = participantsWithScores.some((p, i) =>
        i < participantsWithScores.length - 1 && p.score === participantsWithScores[i + 1].score
    );

    const tieMessage = hasTies && participantsWithScores.length > 1 ? `
        <div class="tie-breaker-notice">
            ℹ️ Tied teams are ranked by gold medals (then silver, bronze) - just like the real Olympics!
        </div>
    ` : '';

    // Check if any medals have been awarded yet
    const totalMedalsAwarded = medalsData.metadata?.totalMedalsAwarded || 0;
    const hasMedals = totalMedalsAwarded > 0;

    let html = tieMessage;
    participantsWithScores.forEach((p, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        // Only show medal emojis once Olympics have started
        const medalEmoji = hasMedals ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '') : '';

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
                    const points = medals ? calculateMedalPoints(medals) : 0;
                    return `${country} (${points})`;
                }).join(' • ')}</div>
            </div>
        `;
    });

    document.getElementById('participantsContent').innerHTML = html;
}

function renderCountries() {
    const countriesArray = Object.entries(medalsData.medals).map(([name, medals]) => {
        const points = calculateMedalPoints(medals);
        const medalCount = medals.gold + medals.silver + medals.bronze;
        return { name, medals, points, medalCount };
    });

    // Sort by total points (desc), then by gold, silver, bronze, then alphabetically
    countriesArray.sort((a, b) => {
        // Primary: Total points
        if (b.points !== a.points) return b.points - a.points;

        // Tie-breaker 1: Most gold medals
        if (b.medals.gold !== a.medals.gold) return b.medals.gold - a.medals.gold;

        // Tie-breaker 2: Most silver medals
        if (b.medals.silver !== a.medals.silver) return b.medals.silver - a.medals.silver;

        // Tie-breaker 3: Most bronze medals
        if (b.medals.bronze !== a.medals.bronze) return b.medals.bronze - a.medals.bronze;

        // Tie-breaker 4: Alphabetical
        return a.name.localeCompare(b.name);
    });

    // Filter to only show countries with medals
    const countriesWithMedals = countriesArray.filter(c => c.medalCount > 0);

    if (countriesWithMedals.length === 0) {
        document.getElementById('countriesContent').innerHTML =
            '<div class="empty-state">No medals awarded yet.</div>';
        return;
    }

    let html = `
        <div class="country-table-wrapper">
            <table class="country-table">
                <thead>
                    <tr>
                        <th class="rank-col">#</th>
                        <th class="country-col">Country</th>
                        <th class="medal-col">🥇</th>
                        <th class="medal-col">🥈</th>
                        <th class="medal-col">🥉</th>
                        <th class="total-col">Points</th>
                    </tr>
                </thead>
                <tbody>
    `;

    countriesWithMedals.forEach((country, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';

        html += `
            <tr class="country-row ${rankClass}">
                <td class="rank-cell ${rankClass}">${rank}</td>
                <td class="country-cell">${country.name}</td>
                <td class="medal-cell gold">${country.medals.gold}</td>
                <td class="medal-cell silver">${country.medals.silver}</td>
                <td class="medal-cell bronze">${country.medals.bronze}</td>
                <td class="total-cell">${country.points}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

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
