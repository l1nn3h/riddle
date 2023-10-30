import {Component} from '@angular/core';
import {RiddleModel} from '../../../models/riddle.model';
import {RiddleService} from '../../../services/riddle.service';
import {SolvedRiddleModel} from '../../../models/solved-riddle.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  riddle:RiddleModel;

  constructor(private riddleService: RiddleService, private router: Router) {
    this.getStarted();
  }

  getStarted() {
    this.riddle = this.riddleService.getCurrentRiddle();
  }

  getNextRiddle(solvedRiddle: SolvedRiddleModel) {
    const nextRiddle = this.riddleService.getNextRiddle();
    if (nextRiddle) {
      this.riddle = nextRiddle;
    } else {
      this.router.navigate(['end']).then();
    }
  }

}
