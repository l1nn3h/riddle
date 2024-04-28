import {Injectable} from '@angular/core';
import {RiddleModel} from '../models/riddle.model';
import {StorageModel} from '../models/storage.model';
import {StorageService} from './storage.service';
import {CheckedSolutionInputModel} from '../models/checked-solution-input-model';
import {RevealedClueModel} from '../models/revealed-clue-model';
import {SavedGameStatsModel} from '../models/saved-game-stats-model';
import {EndGameStatsModel} from '../models/end-game-stats.model';
//short list used for testing
// import riddleList from '../../assets/dummy.json';
// import riddleList from '../../assets/benched.json';
import riddleList from '../../assets/riddles.json';

@Injectable({
              providedIn: 'root',
            })
export class RiddleService {

  //true for prod
  private isShuffled: boolean = true;
  private riddles: RiddleModel[] = [];
  private shuffledRiddles: RiddleModel[];

  constructor(private storageService: StorageService) {
    this.manageGameSave();
  }

  private manageGameSave() {
    const dummyRiddleObject: StorageModel = {
      riddleOrder: this.createRiddleOrder(),
      currentRiddleIndex: this.getCurrentIndex(),
      solutionHistory: this.getSolutionHistory(),
      cluesUsed: this.getClueHistory(),
      gameBeaten: false
    }

    this.storageService.setEncryptedItem("game", dummyRiddleObject)
  }

  private createRiddleOrder(): number[] {
    let orderList: number[] = [];
    if (this.storageService.checkIfEncryptedItemExists('game')) {
      orderList = this.storageService.getEncryptedItem('game').riddleOrder;
      this.riddles = this.recreateRiddlesFromOrder(orderList);
    } else {
      this.recreateRiddlesFromJSON();

      if (this.isShuffled) {
        // shuffled list
        this.shuffledRiddles = this.riddles.map((a) => ({sort: Math.random(), value: a}))
                                   .sort((a, b) => a.sort - b.sort)
                                   .map((a) => a.value);
        this.shuffledRiddles.forEach((riddle: RiddleModel) => {
          orderList.push(riddle.id);
        });
        this.riddles = this.shuffledRiddles;
      } else {
        //original order
        // this.riddles.forEach((riddle: RiddleModel) => {
        //   orderList.push(riddle.id);
        // });

        //reverse order for testing new riddles
        this.riddles.reverse().forEach((riddle: RiddleModel) => {
          orderList.push(riddle.id);
        });
      }

    }
    return orderList;
  }

  private recreateRiddlesFromOrder(orderList: number[]): RiddleModel[] {
    this.recreateRiddlesFromJSON();
    const riddlesFromOrder: RiddleModel[] = [];
    orderList.forEach((id: number) => {
      const currentIndex = id - 1;
        riddlesFromOrder.push(this.riddles[currentIndex]);
    });
    return riddlesFromOrder;
  }

  startNewGame(): void {
    this.storageService.removeEncryptedItem('game');
    this.manageGameSave();
  }

  getCurrentRiddle(): RiddleModel {
    const riddle: RiddleModel = this.riddles[this.getCurrentIndex()];

    for (let clue of riddle.help) {
      clue.used = this.isClueUsed(riddle.id, clue.index);
    }
    return riddle;
  }

  private isClueUsed(riddleIndex: number, clueIndex: number): boolean {
    let clueUsed: boolean = false
    const clueHistory: RevealedClueModel[] = this.getClueHistory();
    for (let clue of clueHistory) {
      if (clue.riddleId == riddleIndex && clue.clueIndex == clueIndex) {
        clueUsed = true;
      }
    }
    return clueUsed;
  }

  getNextRiddle(): RiddleModel {
    let currentIndex = 0;

    if (this.storageService.checkIfEncryptedItemExists('game')) {
      const gameData: StorageModel = this.storageService.getEncryptedItem("game");
      currentIndex = gameData.currentRiddleIndex + 1;
      gameData.currentRiddleIndex = currentIndex;
      this.storageService.setEncryptedItem("game", gameData);
    }

    if(currentIndex < this.riddles.length) {
      return this.riddles[currentIndex];
    } else {
      return null;
    }
  }

  private getCurrentIndex(): number {
    let currentIndex = 0;

    if (this.storageService.checkIfEncryptedItemExists('game')) {
      currentIndex = JSON.parse(this.storageService.getEncryptedItem('game').currentRiddleIndex);
    }
    return currentIndex;
  }

  public checkForSavedGame(): boolean {
    let currentIndexPresent: boolean = false;
    if (this.storageService.checkIfEncryptedItemExists('game')) {
      const game:StorageModel = this.storageService.getEncryptedItem('game');
      currentIndexPresent = game.currentRiddleIndex > 0;
    }
    return currentIndexPresent;
  }

  private recreateRiddlesFromJSON() {
    this.riddles = [];
    this.riddles = JSON.parse(JSON.stringify(riddleList));
  }

  public getSolutionHistory(): CheckedSolutionInputModel[] {
    let history: CheckedSolutionInputModel[] = [];
    if (this.storageService.checkIfEncryptedItemExists('game')) {
      history = this.storageService.getEncryptedItem('game').solutionHistory;
    }
    return history;
  }

  public updateSolutionHistory(submittedSolutions: CheckedSolutionInputModel[]): void {
    const game: StorageModel = this.storageService.getEncryptedItem('game');
    game.solutionHistory = submittedSolutions;
    this.storageService.setEncryptedItem('game', game);
  }

  public getClueHistory(): RevealedClueModel[] {
    let usedClues: RevealedClueModel[] = [];
    if (this.storageService.checkIfEncryptedItemExists('game')) {
      usedClues = this.storageService.getEncryptedItem('game').cluesUsed;
    }
    return usedClues;
  }

  public addNewRevealedClue(revealedClue: RevealedClueModel): void {
    const game: StorageModel = this.storageService.getEncryptedItem('game');
    if (!this.isClueUsed(revealedClue.riddleId, revealedClue.clueIndex)) {
      game.cluesUsed.push(revealedClue);
      this.storageService.setEncryptedItem('game', game);
    }
  }

  public getSavedGameStats(): SavedGameStatsModel {
    const game: StorageModel = this.storageService.getEncryptedItem('game');
    return {
      solvedRiddles: game.currentRiddleIndex,
      allRiddles: game.riddleOrder.length,
      cluesUsed: game.cluesUsed.filter(clue => !clue.isSolution).length,
      solutionsUsed: game.cluesUsed.filter(clue => clue.isSolution).length,
      points: this.calculatePoints(game)
    };
  }

  public getEndGameStats(): EndGameStatsModel {
    const game: StorageModel = this.storageService.getEncryptedItem('game');
    return {
      gameFinished: game.currentRiddleIndex == game.riddleOrder.length,
      allRiddles: game.riddleOrder.length,
      solvedRiddles: game.riddleOrder.length - game.cluesUsed.filter(clue => clue.isSolution).length,
      failedRiddles: game.cluesUsed.filter(clue => clue.isSolution).length,
      riddlesSolvedWithOneClue: this.countRiddlesSolvedWithOneClue(game),
      riddlesSolvedWithBothClues: this.countRiddlesSolvedWithBothClues(game),
      points: this.calculatePoints(game),
    };
  }

  private countRiddlesSolvedWithOneClue(game: StorageModel): number {
    const solutionRiddleIds = game.cluesUsed.filter(clue => clue.isSolution).map(c => c.riddleId);
    let clueListWithoutSolutions = game.cluesUsed.filter(clue => !solutionRiddleIds.includes(clue.riddleId));
    return clueListWithoutSolutions.length - (this.countRiddlesSolvedWithBothClues(game) * 2);
  }

  private countRiddlesSolvedWithBothClues(game: StorageModel): number {
    const solutionRiddleIds = game.cluesUsed.filter(clue => clue.isSolution).map(c => c.riddleId);
    let clueListWithoutSolutions = game.cluesUsed.filter(clue => !solutionRiddleIds.includes(clue.riddleId));
    return clueListWithoutSolutions.length - new Set(clueListWithoutSolutions.map(c => c.riddleId)).size;
  }

  private calculatePoints(game: StorageModel): number {
    let points: number = 0;

    for (let i = 0; i < game.currentRiddleIndex; i++) {
      let currenRiddlePoints = 3;
      const riddleUsedClues: RevealedClueModel[] = game.cluesUsed.filter(clue => clue.riddleId == game.riddleOrder[i])
      if (riddleUsedClues.filter(clue => clue.isSolution).length) {
        currenRiddlePoints = 0;
      } else {
        currenRiddlePoints -= riddleUsedClues.length;
      }
      points += currenRiddlePoints;
    }

    return points;
  }
}
