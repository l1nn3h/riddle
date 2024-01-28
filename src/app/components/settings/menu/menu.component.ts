import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'app-menu',
             templateUrl: './menu.component.html',
             styleUrls: ['./menu.component.scss'],
           })
export class MenuComponent implements OnInit {

  firstTimeVisitor: boolean = true;
  currentStep: string = 'language';

  public ngOnInit(): void {
    if (localStorage && localStorage.getItem('tutorial')) {
      this.firstTimeVisitor = false;
    }
  }

  continueTutorial(nextStep: string): void {
    this.currentStep = nextStep;
  }

  finishTutorial(): void {
    this.currentStep = 'language';
    localStorage.setItem('tutorial', 'done');
    this.firstTimeVisitor = false;
  }

}
