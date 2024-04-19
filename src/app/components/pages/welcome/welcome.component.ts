import {Component} from '@angular/core';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
             selector: 'app-welcome',
             templateUrl: './welcome.component.html',
             styleUrls: ['./welcome.component.scss'],
           })
export class WelcomeComponent {

  savedGameStats: SavedGameStatsModel;

  constructor(private riddleService: RiddleService, private translateService: TranslocoService, private router: Router) {
    if (this.checkForSavedGame()) {
      this.savedGameStats = this.riddleService.getSavedGameStats();
    }
  }

  public continueGame(): void {
      this.router.navigate(['game']).then();
  }

  public startNewGame(): void {
    this.riddleService.startNewGame();
    this.router.navigate(['game']).then();
  }

  public checkForSavedGame(): boolean {
    return this.riddleService.checkForSavedGame();
  }

  getActiveLanguage(lang: string): boolean {
    return this.translateService.getActiveLang() === lang;
  }

}
