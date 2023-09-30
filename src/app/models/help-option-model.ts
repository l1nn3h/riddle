import {HelpTypeEnum} from '../enums/help-type-enum';

export interface HelpOptionModel {
  index: number;
  content: string;
  used: boolean;
  typeText: string;
  type: HelpTypeEnum;
}
