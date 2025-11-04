import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCtj1xbEbFkBbE2KSW7EudwItJjf2-HqN8",
    authDomain: "fantasy-olympics-cb09d.firebaseapp.com",
    projectId: "fantasy-olympics-cb09d",
    storageBucket: "fantasy-olympics-cb09d.firebasestorage.app",
    messagingSenderId: "757292812325",
    appId: "1:757292812325:web:1dc9d1e98f2fc3599017cc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Draft deadline - February 6, 2026 at midnight (Opening Ceremony day)
const DRAFT_DEADLINE = new Date('2026-02-06T00:00:00');

const countries = [
    { "name": "Albania", "code": "ALB", "points": 8 },
    { "name": "Andorra", "code": "AND", "points": 12 },
    { "name": "Argentina", "code": "ARG", "points": 10 },
    { "name": "Armenia", "code": "ARM", "points": 11 },
    { "name": "Australia", "code": "AUS", "points": 15 },
    { "name": "Austria", "code": "AUT", "points": 28 },
    { "name": "Azerbaijan", "code": "AZE", "points": 9 },
    { "name": "Belgium", "code": "BEL", "points": 16 },
    { "name": "Bolivia", "code": "BOL", "points": 7 },
    { "name": "Bosnia and Herzegovina", "code": "BIH", "points": 10 },
    { "name": "Brazil", "code": "BRA", "points": 11 },
    { "name": "Bulgaria", "code": "BUL", "points": 13 },
    { "name": "Canada", "code": "CAN", "points": 29 },
    { "name": "Chile", "code": "CHI", "points": 12 },
    { "name": "China", "code": "CHN", "points": 24 },
    { "name": "Chinese Taipei", "code": "TPE", "points": 10 },
    { "name": "Colombia", "code": "COL", "points": 9 },
    { "name": "Croatia", "code": "CRO", "points": 17 },
    { "name": "Cyprus", "code": "CYP", "points": 6 },
    { "name": "Czech Republic", "code": "CZE", "points": 22 },
    { "name": "Denmark", "code": "DEN", "points": 14 },
    { "name": "Eritrea", "code": "ERI", "points": 5 },
    { "name": "Estonia", "code": "EST", "points": 16 },
    { "name": "Finland", "code": "FIN", "points": 23 },
    { "name": "France", "code": "FRA", "points": 26 },
    { "name": "Georgia", "code": "GEO", "points": 11 },
    { "name": "Germany", "code": "GER", "points": 29 },
    { "name": "Great Britain", "code": "GBR", "points": 19 },
    { "name": "Greece", "code": "GRE", "points": 9 },
    { "name": "Haiti", "code": "HAI", "points": 6 },
    { "name": "Hong Kong", "code": "HKG", "points": 8 },
    { "name": "Hungary", "code": "HUN", "points": 14 },
    { "name": "Iceland", "code": "ISL", "points": 13 },
    { "name": "India", "code": "IND", "points": 10 },
    { "name": "Individual Neutral Athletes", "code": "AIN", "points": 20 },
    { "name": "Iran", "code": "IRI", "points": 9 },
    { "name": "Ireland", "code": "IRL", "points": 11 },
    { "name": "Israel", "code": "ISR", "points": 10 },
    { "name": "Italy", "code": "ITA", "points": 27 },
    { "name": "Japan", "code": "JPN", "points": 25 },
    { "name": "Kazakhstan", "code": "KAZ", "points": 18 },
    { "name": "Kenya", "code": "KEN", "points": 7 },
    { "name": "Kosovo", "code": "KOS", "points": 8 },
    { "name": "Kyrgyzstan", "code": "KGZ", "points": 9 },
    { "name": "Latvia", "code": "LAT", "points": 17 },
    { "name": "Lebanon", "code": "LIB", "points": 7 },
    { "name": "Liechtenstein", "code": "LIE", "points": 13 },
    { "name": "Lithuania", "code": "LTU", "points": 15 },
    { "name": "Luxembourg", "code": "LUX", "points": 9 },
    { "name": "Madagascar", "code": "MAD", "points": 6 },
    { "name": "Malaysia", "code": "MAS", "points": 8 },
    { "name": "Malta", "code": "MLT", "points": 7 },
    { "name": "Mexico", "code": "MEX", "points": 11 },
    { "name": "Monaco", "code": "MON", "points": 10 },
    { "name": "Mongolia", "code": "MGL", "points": 10 },
    { "name": "Montenegro", "code": "MNE", "points": 9 },
    { "name": "Netherlands", "code": "NED", "points": 24 },
    { "name": "New Zealand", "code": "NZL", "points": 14 },
    { "name": "Nigeria", "code": "NGR", "points": 7 },
    { "name": "North Macedonia", "code": "MKD", "points": 9 },
    { "name": "Norway", "code": "NOR", "points": 30 },
    { "name": "Philippines", "code": "PHI", "points": 8 },
    { "name": "Poland", "code": "POL", "points": 21 },
    { "name": "Portugal", "code": "POR", "points": 10 },
    { "name": "Romania", "code": "ROU", "points": 14 },
    { "name": "Saudi Arabia", "code": "KSA", "points": 8 },
    { "name": "Serbia", "code": "SRB", "points": 12 },
    { "name": "Singapore", "code": "SGP", "points": 7 },
    { "name": "Slovakia", "code": "SVK", "points": 19 },
    { "name": "Slovenia", "code": "SLO", "points": 20 },
    { "name": "South Africa", "code": "RSA", "points": 9 },
    { "name": "South Korea", "code": "KOR", "points": 23 },
    { "name": "Spain", "code": "ESP", "points": 16 },
    { "name": "Sweden", "code": "SWE", "points": 27 },
    { "name": "Switzerland", "code": "SUI", "points": 28 },
    { "name": "Thailand", "code": "THA", "points": 8 },
    { "name": "Trinidad and Tobago", "code": "TTO", "points": 7 },
    { "name": "Turkey", "code": "TUR", "points": 11 },
    { "name": "Ukraine", "code": "UKR", "points": 18 },
    { "name": "United Arab Emirates", "code": "UAE", "points": 6 },
    { "name": "United States", "code": "USA", "points": 30 },
    { "name": "Uzbekistan", "code": "UZB", "points": 10 }
];

class OlympicsDraft {
    constructor() {
        this.selectedCountries = [];
        this.pointsSpent = 0;
        this.searchQuery = '';
        this.countdownInterval = null;

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
        // Hide the countdown timer
        const countdownTimer = document.getElementById('countdownTimer');
        if (countdownTimer) {
            countdownTimer.style.display = 'none';
        }

        // Hide the form
        const form = document.getElementById('draftForm');
        if (form) {
            form.style.display = 'none';
        }

        // Show the closed banner
        const banner = document.getElementById('draftClosedBanner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    startCountdown() {
        this.updateCountdown(); // Initial update

        // Update every second
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();

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
        try {
            const saved = localStorage.getItem('olympicsDraft');
            if (saved) {
                const data = JSON.parse(saved);
                this.selectedCountries = data.selectedCountries || [];
                this.pointsSpent = data.pointsSpent || 0;

                // Restore form fields
                if (data.name) document.getElementById('name').value = data.name;
                if (data.teamName) document.getElementById('teamName').value = data.teamName;
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }

    saveToLocalStorage() {
        try {
            const data = {
                selectedCountries: this.selectedCountries,
                pointsSpent: this.pointsSpent,
                name: document.getElementById('name').value,
                teamName: document.getElementById('teamName').value,
                timestamp: Date.now()
            };
            localStorage.setItem('olympicsDraft', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    clearLocalStorage() {
        try {
            localStorage.removeItem('olympicsDraft');
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
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
            this.showConfirmation();
        });

        // Confirmation dialog
        document.getElementById('cancelConfirm').addEventListener('click', () => {
            this.hideConfirmation();
        });

        document.getElementById('confirmSubmit').addEventListener('click', () => {
            this.submitDraft();
        });
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
            } else if (!canAfford) {
                card.classList.add('disabled');
            }

            const nameSpan = document.createElement('span');
            nameSpan.className = 'country-name';
            nameSpan.textContent = country.name;

            const pointsSpan = document.createElement('span');
            pointsSpan.className = 'country-points';
            pointsSpan.textContent = country.points;

            card.appendChild(nameSpan);
            card.appendChild(pointsSpan);

            if (!isSelected && canAfford) {
                card.addEventListener('click', () => this.selectCountry(country));
            }

            grid.appendChild(card);
        });
    }

    selectCountry(country) {
        const pointsRemaining = 100 - this.pointsSpent;
        if (country.points <= pointsRemaining) {
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
        if (this.selectedCountries.length === 0) return;

        if (confirm('Are you sure you want to clear all selected countries?')) {
            this.selectedCountries = [];
            this.pointsSpent = 0;
            this.updateUI();
            this.saveToLocalStorage();
        }
    }

    updateUI() {
        // Update stats
        document.getElementById('pointsSpent').textContent = this.pointsSpent;
        document.getElementById('pointsRemaining').textContent = 100 - this.pointsSpent;
        document.getElementById('countriesCount').textContent = this.selectedCountries.length;

        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const percentage = Math.min((this.pointsSpent / 100) * 100, 100);
        progressFill.style.width = percentage + '%';
        progressFill.textContent = this.pointsSpent + ' / 100';

        if (this.pointsSpent > 100) {
            progressFill.classList.add('over-budget');
        } else {
            progressFill.classList.remove('over-budget');
        }

        // Update warning
        const warning = document.getElementById('warningMessage');
        if (this.selectedCountries.length >= 3) {
            warning.classList.add('hidden');
        } else {
            warning.classList.remove('hidden');
        }

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
        const hasMinCountries = this.selectedCountries.length >= 3;
        const withinBudget = this.pointsSpent <= 100;

        const isValid = name && teamName && hasMinCountries && withinBudget;
        document.getElementById('submitBtn').disabled = !isValid;
    }

    showConfirmation() {
        const overlay = document.getElementById('confirmationOverlay');
        const countryList = document.getElementById('confirmCountryList');
        const totalPoints = document.getElementById('confirmTotalPoints');
        const teamName = document.getElementById('teamName').value.trim();

        document.getElementById('confirmTeamName').textContent = teamName;
        totalPoints.textContent = this.pointsSpent;

        countryList.innerHTML = this.selectedCountries
            .map(c => `${c.name} (${c.points} pts)`)
            .join('<br>');

        overlay.classList.add('show');
    }

    hideConfirmation() {
        document.getElementById('confirmationOverlay').classList.remove('show');
    }

    async submitDraft() {
        const submitBtn = document.getElementById('confirmSubmit');
        const cancelBtn = document.getElementById('cancelConfirm');
        const form = document.getElementById('draftForm');

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        form.classList.add('loading');

        try {
            const submission = {
                name: document.getElementById('name').value.trim(),
                teamName: document.getElementById('teamName').value.trim(),
                countries: this.selectedCountries.map(c => c.name),
                totalPointsSpent: this.pointsSpent,
                timestamp: serverTimestamp()
            };

            await addDoc(collection(db, 'submissions'), submission);

            document.getElementById('successTeamName').textContent = submission.teamName;
            document.getElementById('successMessage').classList.add('show');
            this.hideConfirmation();
            form.style.display = 'none';

            // Clear localStorage after successful submission
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

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new OlympicsDraft();
    });
} else {
    // DOM is already ready
    new OlympicsDraft();
}
