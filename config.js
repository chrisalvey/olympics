// Shared configuration for Winter Olympics Fantasy Draft

// Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCtj1xbEbFkBbE2KSW7EudwItJjf2-HqN8",
    authDomain: "fantasy-olympics-cb09d.firebaseapp.com",
    projectId: "fantasy-olympics-cb09d",
    storageBucket: "fantasy-olympics-cb09d.firebasestorage.app",
    messagingSenderId: "757292812325",
    appId: "1:757292812325:web:1dc9d1e98f2fc3599017cc"
};

// Draft deadline - February 6, 2026 at 2:00 PM ET (right before Opening Ceremony at 8pm CET)
// Opening Ceremony: Feb 6, 2026 at 8:00 PM CET / 2:00 PM ET
export const DRAFT_DEADLINE = new Date('2026-02-06T19:00:00Z'); // 2:00 PM ET = 19:00 UTC

// Draft constraints
export const MAX_COUNTRIES = 10;
export const MIN_COUNTRIES = 3;
export const MAX_BUDGET = 100;

// Medal point values
export const MEDAL_POINTS = {
    gold: 3,
    silver: 2,
    bronze: 1
};
