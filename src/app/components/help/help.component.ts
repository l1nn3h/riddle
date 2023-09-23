import {Component, Input} from '@angular/core';
import {HelpOptionModel} from '../../models/help-option-model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  @Input() public helpOptions: HelpOptionModel[];

}
