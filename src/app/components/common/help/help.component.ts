import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HelpOptionModel} from '../../../models/help-option-model';
import {HelpTypeEnum} from '../../../enums/help-type-enum';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnChanges {

  @Input() public helpOptions: HelpOptionModel[];

  public ngOnChanges(changes: SimpleChanges): void {
    for (let help of this.helpOptions) {
      help.type = HelpTypeEnum[help.typeText];
    }
    console.log(this.helpOptions);
  }



}
