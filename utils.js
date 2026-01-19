// Shared utility functions for Winter Olympics Fantasy Draft

import { MEDAL_POINTS } from './config.js';

/**
 * Country name aliases for matching between different data sources
 * Maps alternative names to the canonical name used in countries.json
 */
const COUNTRY_NAME_ALIASES = {
    'united kingdom': 'great britain',
    'uk': 'great britain',
    'gb': 'great britain',
    'taiwan': 'chinese taipei',
    'republic of china': 'chinese taipei',
    'roc': 'individual neutral athletes',
    'olympic athletes from russia': 'individual neutral athletes',
    'neutral athletes': 'individual neutral athletes',
    'korea': 'south korea',
    'republic of korea': 'south korea',
};

/**
 * Normalize country name for matching (handles typos, spaces, case differences)
 * @param {string} name - Country name to normalize
 * @returns {string} Normalized country name (lowercase, trimmed)
 */
export function normalizeCountryName(name) {
    if (!name || typeof name !== 'string') return '';
    const normalized = name.trim().toLowerCase();
    // Check if this is an alias and return the canonical name
    return COUNTRY_NAME_ALIASES[normalized] || normalized;
}

/**
 * Validate and sanitize medal values to prevent NaN
 * Ensures values are positive integers only
 * @param {Object} medals - Object with gold, silver, bronze properties
 * @returns {Object} Validated medal object
 */
export function validateMedals(medals) {
    return {
        gold: Math.max(0, Math.floor(Number(medals.gold) || 0)),
        silver: Math.max(0, Math.floor(Number(medals.silver) || 0)),
        bronze: Math.max(0, Math.floor(Number(medals.bronze) || 0))
    };
}

/**
 * Calculate point value of medals using official scoring
 * Gold = 3 points, Silver = 2 points, Bronze = 1 point
 * @param {Object} medals - Object with gold, silver, bronze properties
 * @returns {number} Total points
 */
export function calculateMedalPoints(medals) {
    const validated = validateMedals(medals);
    return validated.gold * MEDAL_POINTS.gold +
           validated.silver * MEDAL_POINTS.silver +
           validated.bronze * MEDAL_POINTS.bronze;
}

/**
 * Create a normalized lookup map for case-insensitive country matching
 * @param {Object} medalsData - Object with country names as keys
 * @returns {Object} Lookup map with normalized names as keys
 */
export function createNormalizedLookup(medalsData) {
    const lookup = {};
    Object.keys(medalsData).forEach(country => {
        lookup[normalizeCountryName(country)] = medalsData[country];
    });
    return lookup;
}
