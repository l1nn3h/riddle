import {Component, OnInit} from '@angular/core';
import {ThemeOptionModel} from '../../../models/theme-option-model';

@Component({
             selector: 'app-theme',
             templateUrl: './theme.component.html',
             styleUrls: ['./theme.component.scss'],
           })
export class ThemeComponent implements OnInit {

  currentTheme: ThemeOptionModel;
  optionsVisible: boolean = false;
  themeOptions: ThemeOptionModel[] = [{name: 'light', type: 'light', value: 'light-theme'},
    {name: 'gray', type: 'dark', value: 'gray-theme'},
    {name: 'dark', type: 'dark', value: 'dark-theme'},
    {name: 'blue', type: 'dark', value: 'blue-theme'},
    {name: 'purple', type: 'dark', value: 'purple-theme'},
    {name: 'sand', type: 'light', value: 'sand-theme'},
    {name: 'pink', type: 'light', value: 'pink-theme'},
  ];

  public ngOnInit(): void {
    if (localStorage?.getItem('theme')) {
      const theme: string = localStorage.getItem('theme')
      this.currentTheme = this.themeOptions.find(o => o.value === theme);
    } else {
      this.currentTheme = this.themeOptions[0];
    }
    this.setTheme(this.currentTheme);
  }

  public changeThemeIfNeeded(theme: ThemeOptionModel): void {
    if (this.currentTheme != theme) {
      this.currentTheme = theme;
      this.setTheme(theme);
    }
  }

  public setTheme(theme: ThemeOptionModel) {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('class')
    body.classList.add(theme.type);
    body.classList.add(theme.value);
    localStorage.setItem('theme', theme.value);
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

}
