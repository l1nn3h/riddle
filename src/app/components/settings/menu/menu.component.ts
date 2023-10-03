import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'app-menu',
             templateUrl: './menu.component.html',
             styleUrls: ['./menu.component.scss'],
           })
export class MenuComponent implements OnInit {

  firstTimeVisitor: boolean = true;
  firstStepShown: boolean = false;

  public ngOnInit(): void {
    if (localStorage && localStorage.getItem('tutorial')) {
      this.firstTimeVisitor = false;
    }
    console.log("First time visitor: " + this.firstTimeVisitor);
  }

  continueTutorial(): void {
    this.firstStepShown = true;
  }

  finishTutorial(): void {
    localStorage.setItem('tutorial', 'done');
    this.firstTimeVisitor = false;
  }

}
