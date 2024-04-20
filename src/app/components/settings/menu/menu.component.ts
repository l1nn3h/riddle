import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'app-menu',
             templateUrl: './menu.component.html',
             styleUrls: ['./menu.component.scss'],
           })
export class MenuComponent implements OnInit {

  menuVisible: boolean = false;

  public ngOnInit(): void {
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

}
