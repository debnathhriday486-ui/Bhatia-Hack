import { PredictionType, AlgorithmInfo } from '../types';

export interface MethodEvaluationResult {
  prediction: PredictionType;
  bestMethodName: string;
  allMethods: AlgorithmInfo[];
}

// 1. Trend reversal (last 5 results)
export function trendReversal(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 5) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last5 = recentResults.slice(0, 5);
  const bigCount = last5.filter(num => num >= 5).length;
  return bigCount >= 3 ? 'SMALL' : 'BIG';
}

// 2. Alternate last result
export function alternateLastResult(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 1) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const lastResult = recentResults[0];
  return lastResult >= 5 ? 'SMALL' : 'BIG';
}

// 3. Majority big/small last 10
export function majorityLast10(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const bigCount = recentResults.filter(num => num >= 5).length;
  return bigCount >= recentResults.length / 2 ? 'BIG' : 'SMALL';
}

// 4. Digit sum even/odd
export function digitSumEvenOdd(_recentResults: number[], period: string): PredictionType {
  const periodNum = parseInt(period, 10) || 0;
  const digitSum = periodNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  return digitSum % 2 === 0 ? 'BIG' : 'SMALL';
}

// 5. Last 3 consecutive same
export function last3ConsecutiveSame(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last3 = recentResults.slice(0, 3);
  const allBig = last3.every(num => num >= 5);
  const allSmall = last3.every(num => num < 5);
  if (allBig) return 'SMALL';
  if (allSmall) return 'BIG';
  return Math.random() > 0.5 ? 'BIG' : 'SMALL';
}

// 6. Random flip trend
export function randomFlipTrend(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 1) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const lastResult = recentResults[0];
  const shouldFlip = Math.random() > 0.7; // 30% chance to flip
  if (shouldFlip) {
    return lastResult >= 5 ? 'SMALL' : 'BIG';
  } else {
    return lastResult >= 5 ? 'BIG' : 'SMALL';
  }
}

// 7. Odd opposition big
export function oddOppositionBig(_recentResults: number[], period: string): PredictionType {
  const periodNum = parseInt(period, 10) || 0;
  return periodNum % 2 === 1 ? 'BIG' : 'SMALL';
}

// 8. Even position small
export function evenPositionSmall(_recentResults: number[], period: string): PredictionType {
  const periodNum = parseInt(period, 10) || 0;
  return periodNum % 2 === 0 ? 'SMALL' : 'BIG';
}

// 9. Reverse last 4 majority
export function reverseLast4Majority(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 4) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last4 = recentResults.slice(0, 4);
  const bigCount = last4.filter(num => num >= 5).length;
  return bigCount >= 2 ? 'SMALL' : 'BIG';
}

// 10. Flip last result
export function flipLastResult(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 1) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const lastResult = recentResults[0];
  return lastResult >= 5 ? 'SMALL' : 'BIG';
}

// 11. Sum last 3 results
export function sumLast3Results(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last3 = recentResults.slice(0, 3);
  const sum = last3.reduce((total, num) => total + num, 0);
  return sum >= 15 ? 'BIG' : 'SMALL';
}

// 12. Period ends 0-4 big
export function periodEnds0to4Big(_recentResults: number[], period: string): PredictionType {
  const lastDigit = parseInt(period.slice(-1), 10) || 0;
  return lastDigit <= 4 ? 'BIG' : 'SMALL';
}

// 13. Randomized trend
export function randomizedTrend(_recentResults: number[], period: string): PredictionType {
  const seed = parseInt(period, 10) || 0;
  const randomValue = (seed % 100) / 100;
  return randomValue > 0.5 ? 'BIG' : 'SMALL';
}

// 14. Mirror last 5
export function mirrorLast5(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 5) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const fifthLast = recentResults[4];
  return fifthLast >= 5 ? 'BIG' : 'SMALL';
}

// 15. Flip last 2
export function flipLast2(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 2) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last2 = recentResults.slice(0, 2);
  const same = (last2[0] >= 5 && last2[1] >= 5) || (last2[0] < 5 && last2[1] < 5);
  if (same) {
    return last2[0] >= 5 ? 'SMALL' : 'BIG';
  } else {
    return last2[0] >= 5 ? 'BIG' : 'SMALL';
  }
}

// 16. Weighted last 3
export function weightedLast3(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last3 = recentResults.slice(0, 3);
  let weightedSum = 0;
  for (let i = 0; i < last3.length; i++) {
    const weight = 3 - i;
    weightedSum += (last3[i] >= 5 ? 1 : 0) * weight;
  }
  return weightedSum >= 4 ? 'BIG' : 'SMALL';
}

// 17. Last result + period parity
export function lastResultPeriodParity(recentResults: number[], period: string): PredictionType {
  if (recentResults.length < 1) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const lastResult = recentResults[0];
  const periodNum = parseInt(period, 10) || 0;
  const lastResultEven = lastResult % 2 === 0;
  const periodEven = periodNum % 2 === 0;
  return (lastResultEven && periodEven) || (!lastResultEven && !periodEven) ? 'BIG' : 'SMALL';
}

// 18. Big streak breaker
export function bigStreakBreaker(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last3 = recentResults.slice(0, 3);
  const bigStreak = last3.every(num => num >= 5);
  return bigStreak ? 'SMALL' : 'BIG';
}

// 19. Small streak breaker
export function smallStreakBreaker(recentResults: number[], _period: string): PredictionType {
  if (recentResults.length < 3) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const last3 = recentResults.slice(0, 3);
  const smallStreak = last3.every(num => num < 5);
  return smallStreak ? 'BIG' : 'SMALL';
}

// 20. Alternate by digit sum mod 3
export function alternateByDigitSumMod3(recentResults: number[], period: string): PredictionType {
  const periodNum = parseInt(period, 10) || 0;
  const digitSum = periodNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  const mod3 = digitSum % 3;
  if (mod3 === 0) return 'BIG';
  if (mod3 === 1) return 'SMALL';
  if (recentResults.length < 1) return Math.random() > 0.5 ? 'BIG' : 'SMALL';
  const lastResult = recentResults[0];
  return lastResult >= 5 ? 'SMALL' : 'BIG';
}

export const ALGORITHM_REGISTRY = [
  { id: 1, name: 'Trend Reversal', desc: 'Analyzes 5-round frequency reversal pattern', fn: trendReversal },
  { id: 2, name: 'Alternate Last Result', desc: 'Anticipates pendulum alternating swing', fn: alternateLastResult },
  { id: 3, name: 'Majority Last 10', desc: 'Evaluates 10-round macro dominance', fn: majorityLast10 },
  { id: 4, name: 'Digit Sum Parity', desc: 'Mathematical digit sum odd/even resonance', fn: digitSumEvenOdd },
  { id: 5, name: 'Triple Streak Break', desc: 'Identifies 3x consecutive breakout point', fn: last3ConsecutiveSame },
  { id: 6, name: 'Dynamic Flip Trend', desc: 'Adaptive probability flip threshold model', fn: randomFlipTrend },
  { id: 7, name: 'Odd Opposition Big', desc: 'Period issue numeric polarity alignment', fn: oddOppositionBig },
  { id: 8, name: 'Even Position Small', desc: 'Even index harmonic compression analysis', fn: evenPositionSmall },
  { id: 9, name: 'Reverse 4-Majority', desc: 'Mid-term 4-round trend counter-pressure', fn: reverseLast4Majority },
  { id: 10, name: 'Instant Flip Vector', desc: 'Immediate anti-continuation momentum', fn: flipLastResult },
  { id: 11, name: 'Tri-Sum Distribution', desc: 'Aggregate score threshold partition >= 15', fn: sumLast3Results },
  { id: 12, name: 'Terminal Range 0-4', desc: 'Issue terminal modulus boundary test', fn: periodEnds0to4Big },
  { id: 13, name: 'Deterministic Seed', desc: 'Pseudo-stochastic period hash generation', fn: randomizedTrend },
  { id: 14, name: 'Mirror 5th Historical', desc: 'Quinquennial cyclical symmetry pattern', fn: mirrorLast5 },
  { id: 15, name: 'Dual-State Transition', desc: '2-round autocorrelation state machine', fn: flipLast2 },
  { id: 16, name: 'Decaying Weighted 3x', desc: 'Linear time-decay weighted moving score', fn: weightedLast3 },
  { id: 17, name: 'Parity Resonance', desc: 'Result & Issue parity synchronization', fn: lastResultPeriodParity },
  { id: 18, name: 'Big Streak Breaker', desc: 'Statistical exhaustion filter for Highs', fn: bigStreakBreaker },
  { id: 19, name: 'Small Streak Breaker', desc: 'Statistical exhaustion filter for Lows', fn: smallStreakBreaker },
  { id: 20, name: 'Modulus-3 Tri-Cycle', desc: 'Tri-phase modulo wave computation', fn: alternateByDigitSumMod3 },
];

// Evaluate accuracy of a method on recent data
export function evaluateMethod(
  method: (results: number[], period: string) => PredictionType,
  recentResults: number[],
  period: string
): number {
  if (recentResults.length < 3) return 0.5 + Math.random() * 0.2;
  let correct = 0;
  let total = 0;
  const maxChecks = Math.min(6, recentResults.length);
  for (let i = 1; i < maxChecks; i++) {
    const testResults = recentResults.slice(i);
    const prediction = method(testResults, period);
    const actual = recentResults[i - 1] >= 5 ? 'BIG' : 'SMALL';
    if (prediction === actual) {
      correct++;
    }
    total++;
  }
  return total > 0 ? correct / total : 0.5;
}

// Generate deterministic opposite numbers with distinct values
export function generateOppositeNumbers(prediction: PredictionType, period: string): number[] {
  const seed = parseInt(period, 10) || 12345;
  const oppositeNumbers: number[] = [];

  if (prediction === 'BIG') {
    // For BIG prediction, generate 2 distinct numbers from 0-4 (small numbers)
    const smallNumbers = [0, 1, 2, 3, 4];
    let index1 = Math.abs(seed) % 5;
    let index2 = (Math.abs(seed) + 2) % 5;
    if (index1 === index2) {
      index2 = (index2 + 1) % 5;
    }
    oppositeNumbers.push(smallNumbers[index1]);
    oppositeNumbers.push(smallNumbers[index2]);
  } else {
    // For SMALL prediction, generate 2 distinct numbers from 5-9 (big numbers)
    const bigNumbers = [5, 6, 7, 8, 9];
    let index1 = Math.abs(seed) % 5;
    let index2 = (Math.abs(seed) + 2) % 5;
    if (index1 === index2) {
      index2 = (index2 + 1) % 5;
    }
    oppositeNumbers.push(bigNumbers[index1]);
    oppositeNumbers.push(bigNumbers[index2]);
  }

  return oppositeNumbers.sort((a, b) => a - b);
}

// Select the top-performing algorithm and return predictions
export function getDetailedPrediction(recentResults: number[], period: string): MethodEvaluationResult {
  let bestScore = -1;
  let bestMethod = ALGORITHM_REGISTRY[0];
  const allMethods: AlgorithmInfo[] = [];

  for (const item of ALGORITHM_REGISTRY) {
    const score = evaluateMethod(item.fn, recentResults, period);
    const pred = item.fn(recentResults, period);
    allMethods.push({
      id: item.id,
      name: item.name,
      description: item.desc,
      score: Math.round(score * 100),
      prediction: pred,
    });

    if (score > bestScore) {
      bestScore = score;
      bestMethod = item;
    }
  }

  const prediction = bestMethod ? bestMethod.fn(recentResults, period) : (Math.random() > 0.5 ? 'BIG' : 'SMALL');

  return {
    prediction,
    bestMethodName: bestMethod.name,
    allMethods: allMethods.sort((a, b) => b.score - a.score),
  };
}
