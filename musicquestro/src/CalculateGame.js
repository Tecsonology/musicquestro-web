export default class CalculateGame {
    constructor(score, points, time) {
        this.score = score;   // Total correct levels or tasks completed (0–15)
        this.points = points; // User's accumulated game points (0–6000)
        this.time = time;     // Total time in seconds
    }

    normalize(value, min, max) {
        const normalized = (value - min) / (max - min);
        return Math.max(0, Math.min(1, normalized)); // Clamp between 0 and 1
    }

    calculateGame() {
       if(this.score < 3 && this.points < 1000){
        return 0
       }


        const scoreWeight = 0.4;
        const pointsWeight = 0.4;
        const timeWeight = 0.2;

        // Fair baseline ranges
        const maxScore = 15;
        const maxPoints = 2000;
        const maxTime = 600; // 0 is fastest, 120s is slow

        const normalizedScore = this.normalize(this.score, 0, maxScore);
        const normalizedPoints = this.normalize(this.points, 2000, maxPoints);
        const normalizedTime = this.normalize(this.time, 300, maxTime);
        const invertedTime = 1 - normalizedTime; // Faster = better

        // Weighted contributions
        const scoreContribution = normalizedScore * scoreWeight * 100;
        const pointsContribution = normalizedPoints * pointsWeight * 100;
        const timeContribution = invertedTime * timeWeight * 100;

        const finalPerformanceScore = scoreContribution + pointsContribution + timeContribution;

        //console.log("Score Contribution:", scoreContribution.toFixed(2));
       // console.log("Points Contribution:", pointsContribution.toFixed(2));
        //console.log("Time Bonus:", timeContribution.toFixed(2));

        return finalPerformanceScore.toFixed(2);
    }

    getCoins() {
        const totalScore = parseFloat(this.calculateGame());
        const coins = Math.floor(totalScore / 10); // 10 points = 1 coin
        return coins;
    }

    getTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
