import { Component } from '@angular/core';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';
import {HelpOptionModel} from '../../../models/help-option-model';
import {RiddleModel} from '../../../models/riddle.model';
import {RiddleService} from '../../../services/riddle.service';
import {SolvedRiddleModel} from '../../../models/solved-riddle.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  riddle:RiddleModel;
  gameSolved = false;

  constructor(private riddleService: RiddleService, private router: Router) {
    this.getStarted();
  }

  getStarted() {
    this.riddle = this.riddleService.getCurrentRiddle();
    console.log('got riddle from service');
    console.log(this.riddle);
  }

  getRiddle(currentIndex: number) {
    console.log("In game ts, requesting new riddle. Current index: " + currentIndex);
    const riddle = this.riddleService.getNextRiddle(currentIndex);
    console.log("Received riddle: ");
    console.log(riddle);
    if (!riddle) {
      this.router.navigate(["/end"]).then();
    } else {
      this.riddle = riddle;
    }
  }

  getNextRiddle(solvedRiddle: SolvedRiddleModel) {
    console.log("Riddle solved with index: " + solvedRiddle.index);
    const isNextRiddleAvailable = this.riddleService.checkIfNextRiddleIsAvailable(solvedRiddle.index);
    if (isNextRiddleAvailable) {
      const riddle = this.riddleService.getNextRiddle(solvedRiddle.index);
      console.log("Received riddle: ");
      console.log(riddle);
      this.riddle = riddle;
    } else {
      this.getFinalRiddle();
    }

  }

  private getFinalRiddle(): void {
    this.gameSolved = true;
    this.riddle = this.riddleService.getFinalRiddle();
  }

}
