import {HelpOptionModel} from './help-option-model';

export interface RiddleModel {
  index: number;
  topic: string;
  image: string;
  code: string;
  solutions: string[];
  help: HelpOptionModel[];
}
