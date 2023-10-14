import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';
import {RiddleModel} from '../../../models/riddle.model';
import {SolvedRiddleModel} from '../../../models/solved-riddle.model';

@Component({
             selector: 'app-game-screen',
             templateUrl: './game-screen.component.html',
             styleUrls: ['./game-screen.component.scss'],
           })
export class GameScreenComponent {

  @Input() riddle: RiddleModel;
  @Output() public riddleSolvedEvent = new EventEmitter<SolvedRiddleModel>();

  submittedSolutions: CheckedSolutionInputModel[] = [];

  getCheckedSolutionInput(newCheckedInput: CheckedSolutionInputModel) {
    this.submittedSolutions.unshift(newCheckedInput);
    if (newCheckedInput.correct) {
      const solvedRiddle: SolvedRiddleModel = {
        index: this.riddle.index,
        solution: newCheckedInput.solution,
      };
      this.riddleSolvedEvent.emit(solvedRiddle);
    }
  }

}
