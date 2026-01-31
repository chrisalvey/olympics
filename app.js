import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseConfig, DRAFT_DEADLINE, REDIRECT_TIME, MAX_COUNTRIES, MIN_COUNTRIES, MAX_BUDGET } from './config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Countries data will be loaded from countries.json
let countries = [];

// Olympic-themed team names for random generator
const TEAM_NAMES = [
    "❄️ Ice Ice Baby",
    "🥇 Gold Diggers",
    "🎿 Slalom Shalom",
    "🏂 Board to Death",
    "⛸️ Skate Expectations",
    "🥌 Curl Power",
    "🎿 Downhill from Here",
    "🏅 Medal Detector",
    "❄️ Snow Big Deal",
    "🥇 Frozen Assets",
    "🏔️ Peak Performance",
    "⛷️ Slope Stars",
    "🥈 Silver Linings",
    "🥉 Bronze Age",
    "🏂 Shred Zeppelin",
    "⛸️ Figure It Out",
    "🎿 Alpine Supremacy",
    "❄️ Winter is Coming",
    "🏅 Medal of Honor",
    "🥌 Stone Cold Curlers",
    "🏂 Snowboard of Directors",
    "⛸️ Ice to Meet You",
    "🎿 Ski You Later",
    "🥇 Going for Gold",
    "❄️ Frostbite Club",
    "🏔️ Summit or Nothing",
    "🥈 Second to None",
    "🏂 Wax On Wax Off",
    "⛷️ Slope-a-Dopes",
    "🎿 Nordic Ninjas",
    "❄️ Chill Out",
    "🥇 Gold Standard",
    "🏅 Podium Chasers",
    "⛸️ Blade Runners",
    "🥌 Sweeping Champions",
    "🏂 Halfpipe Heroes",
    "🎿 Schuss or Bust",
    "❄️ Avalanche!",
    "🥇 Triple Threat",
    "⛷️ Mountain Goats",
    "🏅 Medal Mania",
    "🥌 Rock Stars",
    "⛸️ Spinning Victors",
    "🏂 Air Raid",
    "🎿 Powder Hounds",
    "❄️ Ice Breakers",
    "🥇 Crown Jewels",
    "🏔️ Snow Joke",
    "⛷️ Fast & Furious",
    "🥈 Shiny Happy Medalists"
];

// Load countries data from JSON file
async function loadCountries() {
    try {
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`countries.json?t=${new Date().getTime()}`);
        if (!response.ok) {
            throw new Error(`Failed to load countries: ${response.statusText}`);
        }
        countries = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading countries:', error);
        alert('Failed to load countries data. Please refresh the page.');
        return false;
    }
}

class OlympicsDraft {
    constructor() {
        this.selectedCountries = [];
        this.pointsSpent = 0;
        this.searchQuery = '';
        this.countdownInterval = null;

        // Check if we should redirect to leaderboard
        if (new Date() >= REDIRECT_TIME) {
            window.location.replace('index.html');
            return; // Stop execution
        }

        // Check if deadline has passed
        if (this.isDeadlinePassed()) {
            this.showDeadlineClosed();
        } else {
            this.initializeFromLocalStorage();
            this.setupEventListeners();
            this.renderCountries();
            this.updateUI();
            this.startCountdown();
        }
    }

    isDeadlinePassed() {
        return new Date() >= DRAFT_DEADLINE;
    }

    showDeadlineClosed() {
        document.getElementById('countdownTimer').style.display = 'none';
        document.getElementById('draftForm').style.display = 'none';
        document.getElementById('draftClosedBanner').style.display = 'block';
    }

    startCountdown() {
        this.updateCountdown(); // Initial update

        // Update every second
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();

            // Check if redirect time has passed
            if (new Date() >= REDIRECT_TIME) {
                window.location.replace('index.html');
                clearInterval(this.countdownInterval);
                return;
            }

            // Check if deadline has passed
            if (this.isDeadlinePassed()) {
                clearInterval(this.countdownInterval);
                this.showDeadlineClosed();
            }
        }, 1000);
    }

    updateCountdown() {
        const now = new Date();
        const timeRemaining = DRAFT_DEADLINE - now;

        if (timeRemaining <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        // Calculate time units
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update DOM with zero-padding
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    initializeFromLocalStorage() {
        const saved = localStorage.getItem('olympicsDraft');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.selectedCountries = data.selectedCountries || [];
                this.pointsSpent = data.pointsSpent || 0;
                if (data.name) document.getElementById('name').value = data.name;
                if (data.teamName) document.getElementById('teamName').value = data.teamName;
            } catch (error) {
                console.error('Error loading from localStorage:', error);
            }
        }
    }

    saveToLocalStorage() {
        const data = {
            selectedCountries: this.selectedCountries,
            pointsSpent: this.pointsSpent,
            name: document.getElementById('name').value,
            teamName: document.getElementById('teamName').value,
            timestamp: Date.now()
        };
        localStorage.setItem('olympicsDraft', JSON.stringify(data));
    }

    clearLocalStorage() {
        localStorage.removeItem('olympicsDraft');
    }

    setupEventListeners() {
        // Sort controls
        document.querySelectorAll('input[name="sort"]').forEach(radio => {
            radio.addEventListener('change', () => this.renderCountries());
        });

        // Form inputs
        document.getElementById('name').addEventListener('input', () => {
            this.validateForm();
            this.saveToLocalStorage();
        });

        document.getElementById('teamName').addEventListener('input', () => {
            this.validateForm();
            this.saveToLocalStorage();
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderCountries();
        });

        // Clear all button
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAll();
        });

        // Form submission
        document.getElementById('draftForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkValidation()) {
                this.showConfirmation();
            } else {
                this.showValidationErrors();
            }
        });

        // Confirmation dialog
        document.getElementById('cancelConfirm').addEventListener('click', () => {
            this.hideConfirmation();
        });

        document.getElementById('confirmSubmit').addEventListener('click', () => {
            this.submitDraft();
        });

        // Team name generator
        document.getElementById('generateNameBtn').addEventListener('click', () => {
            this.generateTeamName();
        });
    }

    async generateTeamName() {
        const button = document.getElementById('generateNameBtn');
        const teamNameInput = document.getElementById('teamName');

        // Disable button during generation
        button.disabled = true;
        button.textContent = '🎲 ...';

        try {
            // Fetch all existing team names from database
            const querySnapshot = await getDocs(collection(db, 'submissions'));
            const existingNames = new Set();
            querySnapshot.forEach(doc => {
                existingNames.add(doc.data().teamName);
            });

            // Filter out already-taken names
            const availableNames = TEAM_NAMES.filter(name => !existingNames.has(name));

            if (availableNames.length === 0) {
                alert('All pre-generated team names have been taken! Please create your own unique team name.');
                button.disabled = false;
                button.textContent = '🎲 Random';
                return;
            }

            // Pick random available name
            const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
            teamNameInput.value = randomName;

            // Trigger validation and save
            this.validateForm();
            this.saveToLocalStorage();

        } catch (error) {
            console.error('Error generating team name:', error);
            alert('Failed to generate team name. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = '🎲 Random';
        }
    }

    sortCountries(sortType) {
        const sorted = [...countries];
        if (sortType === 'name') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === 'pointsHigh') {
            sorted.sort((a, b) => b.points - a.points);
        } else if (sortType === 'pointsLow') {
            sorted.sort((a, b) => a.points - b.points);
        }
        return sorted;
    }

    filterCountries(countriesList) {
        if (!this.searchQuery) return countriesList;
        return countriesList.filter(country =>
            country.name.toLowerCase().includes(this.searchQuery)
        );
    }

    renderCountries() {
        const grid = document.getElementById('countryGrid');
        const sortType = document.querySelector('input[name="sort"]:checked').value;
        const sorted = this.sortCountries(sortType);
        const filtered = this.filterCountries(sorted);

        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #999; padding: 20px;">No countries found</div>';
            return;
        }

        filtered.forEach(country => {
            const card = document.createElement('div');
            card.className = 'country-card';

            const isSelected = this.selectedCountries.some(c => c.name === country.name);
            const pointsRemaining = 100 - this.pointsSpent;
            const canAfford = !isSelected && (country.points <= pointsRemaining);

            if (isSelected) {
                card.classList.add('selected');
                card.title = 'Click to remove from your team';
            } else if (!canAfford) {
                card.classList.add('disabled');
                const needed = country.points - pointsRemaining;
                card.title = `Can't afford - need ${needed} more point${needed > 1 ? 's' : ''} (${country.points} required, ${pointsRemaining} remaining)`;
            } else {
                card.title = 'Click to add to your team';
            }

            const nameSpan = document.createElement('span');
            nameSpan.className = 'country-name';
            nameSpan.textContent = country.name;

            const pointsSpan = document.createElement('span');
            pointsSpan.className = 'country-points';
            pointsSpan.textContent = country.points;

            card.appendChild(nameSpan);
            card.appendChild(pointsSpan);

            if (isSelected) {
                card.addEventListener('click', () => this.deselectCountry(country.name));
            } else if (canAfford) {
                card.addEventListener('click', () => this.selectCountry(country));
            }

            grid.appendChild(card);
        });
    }

    selectCountry(country) {
        if (this.selectedCountries.length >= MAX_COUNTRIES) {
            alert(`You can only select up to ${MAX_COUNTRIES} countries.`);
            return;
        }

        if (country.points <= MAX_BUDGET - this.pointsSpent) {
            this.selectedCountries.push(country);
            this.pointsSpent += country.points;
            this.updateUI();
            this.saveToLocalStorage();
        }
    }

    deselectCountry(countryName) {
        const country = this.selectedCountries.find(c => c.name === countryName);
        if (country) {
            this.selectedCountries = this.selectedCountries.filter(c => c.name !== countryName);
            this.pointsSpent -= country.points;
            this.updateUI();
            this.saveToLocalStorage();
        }
    }

    clearAll() {
        if (this.selectedCountries.length > 0 &&
            confirm('Are you sure you want to clear all selected countries?')) {
            this.selectedCountries = [];
            this.pointsSpent = 0;
            this.updateUI();
            this.saveToLocalStorage();
        }
    }

    updateUI() {
        // Update stats
        document.getElementById('pointsSpent').textContent = this.pointsSpent;
        document.getElementById('pointsRemaining').textContent = MAX_BUDGET - this.pointsSpent;
        document.getElementById('countriesCount').textContent = `${this.selectedCountries.length}/${MAX_COUNTRIES}`;

        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const percentage = Math.min((this.pointsSpent / MAX_BUDGET) * 100, 100);
        progressFill.style.width = percentage + '%';
        progressFill.textContent = this.pointsSpent + ' / ' + MAX_BUDGET;

        progressFill.classList.toggle('over-budget', this.pointsSpent > MAX_BUDGET);

        // Update warning
        const warning = document.getElementById('warningMessage');
        warning.classList.toggle('hidden', this.selectedCountries.length >= MIN_COUNTRIES);

        // Update selected countries display
        const selectedDiv = document.getElementById('selectedCountries');
        if (this.selectedCountries.length === 0) {
            selectedDiv.className = 'selected-countries empty';
            selectedDiv.innerHTML = '';
        } else {
            selectedDiv.className = 'selected-countries';
            selectedDiv.innerHTML = '';

            this.selectedCountries.forEach(country => {
                const chip = document.createElement('div');
                chip.className = 'selected-chip';
                chip.textContent = `${country.name} (${country.points})`;

                const closeSpan = document.createElement('span');
                closeSpan.textContent = '✕';
                chip.appendChild(closeSpan);

                chip.addEventListener('click', () => this.deselectCountry(country.name));

                selectedDiv.appendChild(chip);
            });
        }

        // Update clear all button
        const clearAllBtn = document.getElementById('clearAllBtn');
        clearAllBtn.disabled = this.selectedCountries.length === 0;

        this.renderCountries();
        this.validateForm();
    }

    validateForm() {
        const name = document.getElementById('name').value.trim();
        const teamName = document.getElementById('teamName').value.trim();
        const hasMinCountries = this.selectedCountries.length >= MIN_COUNTRIES;
        const hasMaxCountries = this.selectedCountries.length <= MAX_COUNTRIES;
        const withinBudget = this.pointsSpent <= MAX_BUDGET;

        const isValid = name && teamName && hasMinCountries && hasMaxCountries && withinBudget;
        const submitBtn = document.getElementById('submitBtn');

        if (isValid) {
            submitBtn.classList.remove('btn-disabled');
            submitBtn.removeAttribute('disabled'); // Keep for accessibility
            document.getElementById('validationError').style.display = 'none';
        } else {
            submitBtn.classList.add('btn-disabled');
        }
    }

    checkValidation() {
        const name = document.getElementById('name').value.trim();
        const teamName = document.getElementById('teamName').value.trim();
        const hasMinCountries = this.selectedCountries.length >= MIN_COUNTRIES;
        const hasMaxCountries = this.selectedCountries.length <= MAX_COUNTRIES;
        const withinBudget = this.pointsSpent <= MAX_BUDGET;

        return name && teamName && hasMinCountries && hasMaxCountries && withinBudget;
    }

    showValidationErrors() {
        const name = document.getElementById('name').value.trim();
        const teamName = document.getElementById('teamName').value.trim();
        const countryCount = this.selectedCountries.length;
        const withinBudget = this.pointsSpent <= MAX_BUDGET;

        const errors = [];

        if (!name) {
            errors.push('Enter your name');
        }
        if (!teamName) {
            errors.push('Enter a team name');
        }
        if (countryCount < MIN_COUNTRIES) {
            errors.push(`Select at least ${MIN_COUNTRIES} countries (currently ${countryCount} selected)`);
        }
        if (countryCount > MAX_COUNTRIES) {
            errors.push(`Select no more than ${MAX_COUNTRIES} countries (currently ${countryCount} selected)`);
        }
        if (!withinBudget) {
            const over = this.pointsSpent - MAX_BUDGET;
            errors.push(`Reduce points spent by ${over} (currently ${this.pointsSpent}/100)`);
        }

        if (errors.length > 0) {
            const errorList = document.getElementById('validationErrorList');
            errorList.innerHTML = errors.map(err => `<li>${err}</li>`).join('');
            document.getElementById('validationError').style.display = 'flex';
        }
    }

    showConfirmation() {
        const teamName = document.getElementById('teamName').value.trim();
        const confirmTeamNameEl = document.getElementById('confirmTeamName');
        confirmTeamNameEl.textContent = teamName;

        // Apply dynamic sizing class based on name length
        const nameLength = teamName.length;
        confirmTeamNameEl.className = nameLength > 30 ? 'very-long-name' : nameLength > 20 ? 'long-name' : '';

        document.getElementById('confirmTotalPoints').textContent = this.pointsSpent;
        document.getElementById('confirmCountryList').innerHTML = this.selectedCountries
            .map(c => `${c.name} (${c.points} pts)`)
            .join('<br>');
        document.getElementById('confirmationOverlay').classList.add('show');
    }

    hideConfirmation() {
        document.getElementById('confirmationOverlay').classList.remove('show');
    }

    async submitDraft() {
        const submitBtn = document.getElementById('confirmSubmit');
        const cancelBtn = document.getElementById('cancelConfirm');
        const form = document.getElementById('draftForm');
        const name = document.getElementById('name').value.trim();
        const teamName = document.getElementById('teamName').value.trim();

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        form.classList.add('loading');

        try {
            // Check for duplicate submissions by name
            const q = query(
                collection(db, 'submissions'),
                where('name', '==', name)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Duplicate found
                alert(`A team has already been submitted by "${name}". Each person can only submit one team. If you need to update your team, please contact the organizer.`);
                submitBtn.textContent = 'Yes, Submit';
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                form.classList.remove('loading');
                return;
            }

            // No duplicate, proceed with submission
            await addDoc(collection(db, 'submissions'), {
                name: name,
                teamName: teamName,
                countries: this.selectedCountries.map(c => c.name),
                totalPointsSpent: this.pointsSpent,
                timestamp: serverTimestamp()
            });

            const successTeamNameEl = document.getElementById('successTeamName');
            successTeamNameEl.textContent = teamName;

            // Apply dynamic sizing class based on name length
            const nameLength = teamName.length;
            successTeamNameEl.className = nameLength > 30 ? 'very-long-name' : nameLength > 20 ? 'long-name' : '';

            document.getElementById('successMessage').classList.add('show');
            this.hideConfirmation();
            form.style.display = 'none';
            this.clearLocalStorage();

        } catch (error) {
            console.error('Error submitting draft:', error);
            alert('Error submitting draft. Please try again.');
            submitBtn.textContent = 'Yes, Submit';
            submitBtn.disabled = false;
            cancelBtn.disabled = false;
            form.classList.remove('loading');
        }
    }
}

// Initialize the draft app when DOM is ready
async function initializeDraft() {
    // Load countries data first
    const loaded = await loadCountries();
    if (loaded) {
        new OlympicsDraft();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDraft);
} else {
    // DOM is already ready
    initializeDraft();
}
