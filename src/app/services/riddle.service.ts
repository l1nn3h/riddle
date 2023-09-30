import {Injectable} from '@angular/core';
import {RiddleModel} from '../models/riddle.model';
import riddleList from '../../assets/riddles.json';
import end from '../../assets/end.json';

@Injectable({
              providedIn: 'root',
            })
export class RiddleService {

  private riddles: RiddleModel[] = riddleList;
  private finalRiddle: RiddleModel = end;
  private currentRiddleIndex: number;

  constructor() {
    this.currentRiddleIndex = 0;
  }

  startNewGame(): RiddleModel {
    return this.riddles[0];
  }

  resetGame() {
    this.currentRiddleIndex = 0;
  }

  getCurrentRiddle(): RiddleModel {
    return this.riddles[this.currentRiddleIndex];
  }

  getNextRiddle(solvedRiddleIndex: number): RiddleModel {
    this.currentRiddleIndex = solvedRiddleIndex + 1;
    return this.riddles[this.currentRiddleIndex];
  }

  checkIfNextRiddleIsAvailable(solvedRiddleIndex: number) {
    return solvedRiddleIndex + 1 < this.riddles.length;
  }

  getFinalRiddle() {
    return this.finalRiddle;
  }

  continueGame(code: string): number {
    let foundOrder = 0;
    for (const riddle of this.riddles) {
      if (riddle.code === code) {
        foundOrder = riddle.index;
        this.currentRiddleIndex = foundOrder;
        break;
      }
    }
    return foundOrder;
  }

}
