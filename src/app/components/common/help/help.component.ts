import {Component, Input, OnChanges} from '@angular/core';
import {HelpOptionModel} from '../../../models/help-option-model';
import {HelpTypeEnum} from '../../../enums/help-type-enum';

@Component({
             selector: 'app-help',
             templateUrl: './help.component.html',
             styleUrls: ['./help.component.scss'],
           })
export class HelpComponent implements OnChanges {

  @Input() public helpOptions: HelpOptionModel[];
  public icons: string[] = ['fa-solid fa-lightbulb',
                            'fa-solid fa-magnifying-glass',
                            'fa-solid fa-folder-open'];

  public ngOnChanges(): void {
    for (let help of this.helpOptions) {
      help.type = HelpTypeEnum[help.typeText];
    }
  }

  public revealClue(index: number): void {
    this.helpOptions[index].used = true;
  }

  protected readonly HelpTypeEnum = HelpTypeEnum;
}
