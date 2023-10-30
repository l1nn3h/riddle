import {HelpOptionModel} from './help-option-model';

export interface RiddleModel {
  id: number;
  topic: string;
  image: string;
  solutions: string[];
  help: HelpOptionModel[];
}
