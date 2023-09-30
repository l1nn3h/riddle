import {Component, Input} from '@angular/core';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';

@Component({
  selector: 'app-solution-history',
  templateUrl: './solution-history.component.html',
  styleUrls: ['./solution-history.component.scss']
})
export class SolutionHistoryComponent  {
  @Input() submittedSolutions:CheckedSolutionInputModel[] = [];



}
