import { Component } from '@angular/core';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {

  savedGameStats: SavedGameStatsModel;

  constructor(private riddleService: RiddleService, private router: Router) {
    if (this.riddleService.checkForSavedGame()) {
      const stats = this.riddleService.getSavedGameStats();
      if (stats.allRiddles == stats.solvedRiddles) {
        this.savedGameStats = stats;
        console.log(stats);
      }
    }
  }

  public navigateToWelcome(): void {
    this.router.navigate(['']).then();
  }
}
