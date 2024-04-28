export interface EndGameStatsModel {
  gameFinished: boolean;
  allRiddles: number;
  solvedRiddles: number;
  failedRiddles: number;
  riddlesSolvedWithOneClue: number;
  riddlesSolvedWithBothClues: number;
  points: number;
}
