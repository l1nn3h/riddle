import {Component} from '@angular/core';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';
import {SavedGameStatsModel} from '../../../models/saved-game-stats-model';
import {LanguageSelectorComponent} from '../../settings/language-selector/language-selector.component';

@Component({
             selector: 'app-welcome',
             templateUrl: './welcome.component.html',
             styleUrls: ['./welcome.component.scss'],
           })
export class WelcomeComponent {

  savedGameStats: SavedGameStatsModel;
  currentLanguage: string = LanguageSelectorComponent._currentLanguage;

  constructor(private riddleService: RiddleService, private router: Router) {
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

  setImageSource(size: string): string {
    const imagePath = '/assets/images/dummy/';
    const language: string = document.getElementsByTagName('html')[0].getAttribute('lang');
    const theme: string = document.getElementsByTagName('body')[0].classList.item(0) === 'light'
                              ? 'dark'
                              : 'light';
    return imagePath + theme + size + language + '.jpg';
  }

  getVideoSource(size: string): string {
    const language: string = document.getElementsByTagName('html')[0].getAttribute('lang');
    //default: large English video
    let videoLink = 'https://res.cloudinary.com/l1nn3h/video/upload/v1713512764/riddle_video/tutorial_lg_ENG_fyw3gi.mp4';

    if (language === 'EN' && size === 'small') {
      videoLink = 'https://res.cloudinary.com/l1nn3h/video/upload/v1713536392/riddle_video/tutorial_sm_ENG_ym5iqb.mp4';
    } else if (language === 'HU' && size === 'small') {
      videoLink = 'https://res.cloudinary.com/l1nn3h/video/upload/v1713548476/riddle_video/Riddle_tutorial_sm_HUN_ft0sif.mp4';
    } else if (language === 'HU' && size === 'large') {
      videoLink = 'https://res.cloudinary.com/l1nn3h/video/upload/v1713512764/riddle_video/tutorial_lg_ENG_fyw3gi.mp4';
    }

    return videoLink;
  }
}
