import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'app-theme',
             templateUrl: './theme.component.html',
             styleUrls: ['./theme.component.scss'],
           })
export class ThemeComponent implements OnInit {

  currentTheme: string;
  optionsVisible: boolean = false;
  themeOptions: string[] = ['light', 'gray', 'dark', 'blue', 'purple', 'sand', 'pink'];

  public ngOnInit(): void {
    if (localStorage && localStorage.getItem('theme')) {
      this.currentTheme = localStorage.getItem('theme');
    } else {
      this.currentTheme = 'light';
    }
    this.setTheme(this.currentTheme);
  }

  public changeThemeIfNeeded(theme: string): void {
    if (this.currentTheme != theme) {
      this.currentTheme = theme;
      this.setTheme(theme);
    }
  }

  public setTheme(theme: string) {
    const body = document.getElementsByTagName('body')[0];
    this.themeOptions.forEach((themeOption) => {
      if (body.classList.contains(themeOption + '-theme')) {
        body.classList.remove(themeOption + '-theme');
      }
    });
    body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

}
