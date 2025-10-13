export default class CalculateGame {
    /**
     * @param {number} score - Total correct levels or tasks completed (Max 15)
     * @param {number} points - User's accumulated game points (Max ~6000)
     * @param {number} MAX_SCORE
     * @param {number} MAX_POINTS
     * @param {number} VICTORY_THRESHOLD
     */
    constructor(score, points, MAX_SCORE, MAX_POINTS, VICTORY_THRESHOLD) {
        this.score = score;
        this.points = points;
        
        // Define scoring constants (moved to class scope for clarity)
        this.MAX_SCORE = MAX_SCORE   // Max number of levels/tasks
        this.MAX_POINTS = MAX_POINTS; // Expected maximum achievable points
        this.VICTORY_THRESHOLD = VICTORY_THRESHOLD // Performance Rating needed for Victory (out of 100)
    }

    /**
     * Normalizes a value to a 0-1 range based on min and max.
     * @param {number} value - The current value.
     * @param {number} min - The minimum possible value (usually 0).
     * @param {number} max - The maximum expected value.
     * @returns {number} - The normalized value, clamped between 0 and 1.
     */
    normalize(value, min, max) {
        const normalized = (value - min) / (max - min);
        // Clamp the result: prevents negative scores or scores above 100%
        return Math.max(0, Math.min(1, normalized)); 
    }

    /**
     * Calculates a performance rating from 0 to 100 based on Score and Points.
     * @returns {string} - The final performance rating as a string with 2 decimal places.
     */
    calculatePerformanceRating() {
        // Early exit for minimal performance
      

        // Weights now total 1.0 (100% of the rating)
        const scoreWeight = 0.5;
        const pointsWeight = 0.5;

        // 1. Normalize both metrics to a 0-1 scale
        const normalizedScore = this.normalize(this.score, 0, this.MAX_SCORE);
        const normalizedPoints = this.normalize(this.points, 0, this.MAX_POINTS);

        // 2. Calculate weighted contributions
        // The * 100 converts the 0-1 scale into a 0-100 percentage/rating
        const scoreContribution = normalizedScore * scoreWeight * 100;
        const pointsContribution = normalizedPoints * pointsWeight * 100;

        const finalPerformanceScore = scoreContribution + pointsContribution;

        console.log('Score contribution: ', scoreContribution)
        console.log('Points Contribution: ', pointsContribution)
        console.log('final Points: ', finalPerformanceScore)

        // Optional: Include a small bonus for perfect/near-perfect play (e.g., if score is maxed)
        // if (this.score === this.MAX_SCORE) {
        //     finalPerformanceScore += 5; // Adds up to 5 points bonus
        // }

        return Math.min(100, finalPerformanceScore).toFixed(2);
    }
    
    /**
     * Determines the outcome of the game based on the Performance Rating.
     * @returns {string} - 'Victory' or 'Defeat'.
     */
    getGameOutcome() {
        const rating = parseFloat(this.calculatePerformanceRating());
        
        if (rating >= this.VICTORY_THRESHOLD) {
            return 'Victory';
        } else {
            return 'Defeat';
        }
    }

    /**
     * Calculates the number of coins earned based on the performance rating.
     * @returns {number} - The total coins earned.
     */
    getCoins() {
        const rating = parseFloat(this.calculatePerformanceRating());
        // Simple coin formula: e.g., 1 coin for every 5 rating points
        const coins = Math.floor(rating / 5); 
        return coins;
    }

    // Removed getTime() method as it's no longer used or tracked.
}

// Example Usage (for testing the revision):
                    // e.g., 14