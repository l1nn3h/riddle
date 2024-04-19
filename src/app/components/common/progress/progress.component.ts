import {Component, Input} from '@angular/core';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';
import {TranslocoDirective} from '@ngneat/transloco';

@Component({
  selector: 'app-progress',
  standalone: true,
             imports: [
               TranslocoDirective,
             ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {

  @Input() progress: SavedGameStatsModel;

  // @Input() solved: number;
  // @Input() total: number;
  // @Input() points: number;

}
