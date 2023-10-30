import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';
import {RiddleModel} from '../../../models/riddle.model';
import {SolvedRiddleModel} from '../../../models/solved-riddle.model';
import {RiddleService} from '../../../services/riddle.service';
import {RevealedClueModel} from '../../../models/revealed-clue-model';

@Component({
             selector: 'app-game-screen',
             templateUrl: './game-screen.component.html',
             styleUrls: ['./game-screen.component.scss'],
           })
export class GameScreenComponent {

  @Input() riddle: RiddleModel;
  @Output() public riddleSolvedEvent = new EventEmitter<SolvedRiddleModel>();

  submittedSolutions: CheckedSolutionInputModel[] = [];

  constructor(private riddleService: RiddleService) {
    this.submittedSolutions = this.riddleService.getSolutionHistory();
  }

  getCheckedSolutionInput(newCheckedInput: CheckedSolutionInputModel): void {
    this.submittedSolutions.unshift(newCheckedInput);
    this.addItemToSolutionHistory();
    if (newCheckedInput.correct) {
      const solvedRiddle: SolvedRiddleModel = {
        index: this.riddle.id,
        solution: newCheckedInput.solution,
      };
      this.riddleSolvedEvent.emit(solvedRiddle);
    }
  }

  private addItemToSolutionHistory(): void {
    this.riddleService.updateSolutionHistory(this.submittedSolutions);
    this.submittedSolutions = this.riddleService.getSolutionHistory();
  }

  addNewUsedClue(clueIndex: number): void {
    const revealedClue: RevealedClueModel = {
      riddleId: this.riddle.id,
      clueIndex: clueIndex,
      isSolution: clueIndex == 2
    }

    this.riddleService.addNewRevealedClue(revealedClue);
  }

}
