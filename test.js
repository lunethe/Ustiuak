function calculateRPM(stack, rank, inventoryMultiplier) {
	const maxRPM = 100 * (Math.pow(2.6, 24));
	const minRPM = 100 * (Math.pow(2.6, 24));
}

const base = 10;
const stack = 1;
const rank = 7;

const stackX = 0.7;
const rankX = 1.15;

const rankUpGrowthRate = 1.4;

const minStack = base * Math.pow(6.5, Math.log(stack + 1) * stackX) * Math.pow(24, Math.log(rank + 1) * rankX);
const maxStack = base * Math.pow(6.5, Math.log(stack + 1 + 1) * stackX) * Math.pow(24, Math.log(rank + 1) * rankX);
const rankUpStack = base * Math.pow(6, Math.log(3) * stackX) * Math.pow(27, Math.log(rank + 0.7) * rankX);
const rankUpValue = Math.round(Math.pow(rankUpStack, rankUpGrowthRate));

console.log(`Min Stack: ${minStack.toLocaleString()}`);
console.log(`Max Stack: ${maxStack.toLocaleString()}`);
console.log(`Rankup Stack (min): ${rankUpStack.toLocaleString()}`);
console.log(`Rankup Cost: ${rankUpValue.toLocaleString()}`);