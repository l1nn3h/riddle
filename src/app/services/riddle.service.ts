import {Injectable} from '@angular/core';
import {RiddleModel} from '../models/riddle.model';
import riddleList from '../../assets/riddles.json';
import end from '../../assets/end.json';
import {StorageModel} from '../models/storage.model';
import {StorageService} from './storage.service';
import {CheckedSolutionInputModel} from '../models/checked-solution-input-model';
import {RevealedClueModel} from '../models/revealed-clue-model';
import {SavedGameStatsModel} from '../models/saved-game-stats-model';

@Injectable({
              providedIn: 'root',
            })
export class RiddleService {

  private isShuffled: boolean = false;
  private riddles: RiddleModel[] = [];
  private shuffledRiddles: RiddleModel[];
  private finalRiddle: RiddleModel = end;

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

    console.log(dummyRiddleObject);
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
        //   orderList.push(riddle.index);
        // });
        //reverse order
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
    orderList.forEach((index) => {
      riddlesFromOrder.push(this.riddles[index]);
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

      console.log(this.storageService.getEncryptedItem('game'));
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
    game.cluesUsed.push(revealedClue);
    this.storageService.setEncryptedItem('game', game);
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
