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

// Draft deadline - February 7, 2026 at 12:00 AM Central (after Opening Ceremony)
// Opening Ceremony: Feb 6, 2026 at 8:00 PM CET / 1:00 PM Central
// Deadline allows drafting through entire opening ceremony day
export const DRAFT_DEADLINE = new Date('2026-02-07T06:00:00Z'); // 12:00 AM CST = 6:00 AM UTC

// Redirect time - February 7, 2026 at 6:00 AM Central
// After this time, draft.html automatically redirects to index.html (leaderboard)
// Gives 6-hour buffer after deadline for users to view closed message
export const REDIRECT_TIME = new Date('2026-02-07T12:00:00Z'); // 6:00 AM CST = 12:00 PM UTC

// Draft constraints
export const MAX_COUNTRIES = 15;
export const MIN_COUNTRIES = 5;
export const MAX_BUDGET = 100;

// Medal point values
export const MEDAL_POINTS = {
    gold: 3,
    silver: 2,
    bronze: 1
};
