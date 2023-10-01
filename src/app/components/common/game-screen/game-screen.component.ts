import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';
import {RiddleModel} from '../../../models/riddle.model';
import {SolvedRiddleModel} from '../../../models/solved-riddle.model';
import {TranslocoService} from '@ngneat/transloco';

@Component({
             selector: 'app-game-screen',
             templateUrl: './game-screen.component.html',
             styleUrls: ['./game-screen.component.scss'],
           })
export class GameScreenComponent {

  @Input() riddle: RiddleModel;
  @Output() public riddleSolvedEvent = new EventEmitter<SolvedRiddleModel>();

  submittedSolutions: CheckedSolutionInputModel[] = [];

  constructor(private translocoService: TranslocoService) {
  }

  getCheckedSolutionInput(newCheckedInput: CheckedSolutionInputModel) {
    this.submittedSolutions.unshift(newCheckedInput);
    if (newCheckedInput.correct) {
      this.giveLevelCode();
      const solvedRiddle: SolvedRiddleModel = {
        index: this.riddle.index,
        solution: newCheckedInput.solution,
      };
      this.riddleSolvedEvent.emit(solvedRiddle);
    }
  }

  private giveLevelCode(): void {
    const codeDesc: string = this.translocoService.translate("code.description")
    const levelCode: string = this.translocoService.translate("code."+this.riddle.code);
    const levelCodeMessage: CheckedSolutionInputModel = {
      correct: false, isCode: true, solution: codeDesc + levelCode
    };
    this.submittedSolutions.unshift(levelCodeMessage);
  }
}
