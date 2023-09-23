import { Component } from '@angular/core';
import {HelpOptionModel} from '../../../../models/help-option-model';
import {CheckedSolutionInputModel} from '../../../../models/checked-solution-input-model';

@Component({
  selector: 'app-riddle-one',
  templateUrl: './riddle-one.component.html',
  styleUrls: ['./riddle-one.component.scss']
})
export class RiddleOneComponent {

  pictureSource:string = "/assets/images/riddles/cat.png";
  submittedSolutions:CheckedSolutionInputModel[] = [];
  solutionOptions:string[] = ["correct", "right"];
  helpOptions:HelpOptionModel[] = [
    {
      order: 1,
      textEng: "small help",
      textHun: "kis segítség",
      used: false
    },
    {
      order: 2,
      textEng: "large help",
      textHun: "nagy segítség",
      used: false
    },
    {
      order: 3,
      textEng: "solution",
      textHun: "megoldás",
      used: false
    },
  ];

  getCheckedSolutionInput(newCheckedInput: CheckedSolutionInputModel) {
    console.log("Newly submitted: " + newCheckedInput.solution + ", " + newCheckedInput.correct);
    this.submittedSolutions.push(newCheckedInput);
    console.log(this.submittedSolutions);
  }

}
