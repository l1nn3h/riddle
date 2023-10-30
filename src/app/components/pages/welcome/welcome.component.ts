import {Component} from '@angular/core';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';

@Component({
             selector: 'app-welcome',
             templateUrl: './welcome.component.html',
             styleUrls: ['./welcome.component.scss'],
           })
export class WelcomeComponent {

  savedGameStats: SavedGameStatsModel;

  constructor(private riddleService: RiddleService, private router: Router) {
    if (this.checkForSavedGame()) {
      this.savedGameStats = this.riddleService.getSavedGameStats();
      console.log(this.savedGameStats);
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

  setImageSource(size: string): string {
    const imagePath = '/assets/images/dummy/';
    const language: string = document.getElementsByTagName('html')[0].getAttribute('lang');
    const theme: string = document.getElementsByTagName('body')[0].classList.item(0) === 'light'
                              ? 'dark'
                              : 'light';
    return imagePath + theme + size + language + '.jpg';
  }
}
