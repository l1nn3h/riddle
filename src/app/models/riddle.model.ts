import {HelpOptionModel} from './help-option-model';

export interface RiddleModel {
  index: number;
  topic: string;
  image: string;
  displayCode: string;
  codes: string[];
  solutions: string[];
  help: HelpOptionModel[];
}
