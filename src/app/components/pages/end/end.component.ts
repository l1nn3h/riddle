import {Component} from '@angular/core';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';
import {EndGameStatsModel} from '../../../models/end-game-stats.model';

@Component({
             selector: 'app-end',
             templateUrl: './end.component.html',
             styleUrls: ['./end.component.scss'],
           })
export class EndComponent {

  endStats: EndGameStatsModel;

  constructor(private riddleService: RiddleService, private router: Router) {
    if (this.riddleService.checkForSavedGame()) {
      const stats = this.riddleService.getEndGameStats();
      if (stats.gameFinished) {
        this.endStats = stats;
      } else {
        this.router.navigate(['error']).then();
      }
    }
  }
}
