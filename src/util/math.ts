const base = 10;
const stackX = 0.7;
const rankX = 1.15;
const rankUpGrowthRate = 1.4;

export interface RPMData {
	min: number;
	max: number;
}

export function getRPM(stack: number, rank: number): RPMData {
	const min = roundWithScale(base * Math.pow(6.5, Math.log(stack + 1) * stackX) * Math.pow(24, Math.log(rank + 1) * rankX));
	const max = roundWithScale(base * Math.pow(6.5, Math.log(stack + 1 + 1) * stackX) * Math.pow(24, Math.log(rank + 1) * rankX));

	return { min, max };
}

export function calculateRandomRPM(stack: number, rank: number): number {
	const rpm = getRPM(stack, rank);
	return Math.floor(Math.random() * (rpm.max - rpm.min + 1)) + rpm.min;
}

export function calculateRankUp(currentRank: number): number {
	const rankUpStack = base * Math.pow(6, Math.log(3) * stackX) * Math.pow(27, Math.log(currentRank + 0.7) * rankX);
	return roundWithScale(Math.pow(rankUpStack, rankUpGrowthRate));
}

export function roundWithScale(num: number): number {
	if (Math.abs(num) >= 100) {
		if (Math.abs(num) < 1000) {
			return Math.round(num / 10) * 10;
		} else if (Math.abs(num) < 100000) {
			return Math.round(num / 100) * 100;
		} else {
			return Math.round(num / 1000) * 1000;
		}
	} else {
		return num;
	}
}