import {Injectable} from '@angular/core';
import {RiddleModel} from '../models/riddle.model';
import riddleList from '../../assets/riddles.json';
import end from '../../assets/end.json';

@Injectable({
              providedIn: 'root',
            })
export class RiddleService {

  private riddles: RiddleModel[] = riddleList;
  private shuffledRiddles: RiddleModel[];
  private finalRiddle: RiddleModel = end;
  private currentRiddleIndex: number;

  constructor() {
    this.currentRiddleIndex = 0;
    this.createShuffledOrder();
    this.setCurrentIndex();
    this.riddles = this.shuffledRiddles;
    console.log(this.riddles);
  }

  private createShuffledOrder(): void {
    let orderList: number[] = [];
    if (localStorage?.getItem('order')) {
      orderList = JSON.parse(localStorage.getItem('order'));
      this.recreateShuffledOrder(orderList);
    } else {
      // shuffled list
      // this.shuffledRiddles = this.riddles.map((a) => ({sort: Math.random(), value: a}))
      //                            .sort((a, b) => a.sort - b.sort)
      //                            .map((a) => a.value);
      // this.shuffledRiddles.forEach((riddle: RiddleModel) => {
      //   orderList.push(riddle.index);
      // });
      this.riddles.forEach((riddle: RiddleModel) => {
        orderList.push(riddle.index);
      });
      localStorage.setItem('order', JSON.stringify(orderList));
    }
    console.log(orderList);
  }

  private recreateShuffledOrder(orderList: number[]): void {
    this.riddles = riddleList;
    const riddlesInPreviousOrder: RiddleModel[] = [];
    orderList.forEach((index) => {
      riddlesInPreviousOrder.push(this.riddles[index]);
    });
    this.shuffledRiddles = riddlesInPreviousOrder;
  }

  startNewGame(): void {
    this.currentRiddleIndex = 0;
    if (localStorage?.getItem('order')) {
      localStorage.removeItem('order');
    }
    if (localStorage?.getItem('currentIndex')) {
      localStorage.setItem('currentIndex', '0');
    }
    this.currentRiddleIndex = 0;
    this.createShuffledOrder();
    this.riddles = this.shuffledRiddles;
    console.log(this.riddles);
  }

  getCurrentRiddle(): RiddleModel {
    return this.riddles[this.currentRiddleIndex];
  }

  getNextRiddle(): RiddleModel {
    this.currentRiddleIndex += 1;
    localStorage.setItem('currentIndex', JSON.stringify(this.currentRiddleIndex));
    return this.riddles[this.currentRiddleIndex];
  }

  checkIfNextRiddleIsAvailable() {
    return this.currentRiddleIndex + 1 < this.riddles.length;
  }

  getFinalRiddle() {
    return this.finalRiddle;
  }


  private setCurrentIndex(): void {
    let currentIndex: number;
    if (localStorage?.getItem('currentIndex')) {
      currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
    } else {
      localStorage.setItem('currentIndex', '0');
    }
    console.log('current index: ' + currentIndex);
    this.currentRiddleIndex = currentIndex;
  }

  public checkForSavedGame(): boolean {
    let currentIndexPresent: boolean = false;
    if (localStorage?.getItem('currentIndex')) {
      currentIndexPresent = true;
    }
    return currentIndexPresent;
  }
}
