import {RevealedClueModel} from './revealed-clue-model';

export interface StorageModel {
  riddleOrder: number[],
  currentRiddleIndex: number;
  gameBeaten: boolean;
  solutionHistory: any[];
  cluesUsed: RevealedClueModel[];
}
