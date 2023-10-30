import { Component } from '@angular/core';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';
import {RiddleService} from '../../../services/riddle.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {

  savedGameStats: SavedGameStatsModel;

  constructor(private riddleService: RiddleService) {
    if (this.checkForSavedGame()) {
      this.savedGameStats = this.riddleService.getSavedGameStats();
      console.log(this.savedGameStats);
    }
  }

  public checkForSavedGame(): boolean {
    return this.riddleService.checkForSavedGame();
  }
}
