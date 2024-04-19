import {Component, OnInit} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  currentLanguage:string = "en";

  constructor(private translateService: TranslocoService) {
  }

  public ngOnInit(): void {
    if (localStorage?.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      this.currentLanguage = lang;
      this.translateService.setActiveLang(lang);
      this.setHTMLLanguage(lang)
    } else {
      this.changeLanguage(this.currentLanguage);
    }
  }

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translateService.setActiveLang(language);
    localStorage.setItem('lang', language);
    this.setHTMLLanguage(language);
  }

  setHTMLLanguage(language: string) {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('lang', language.toUpperCase());
  }
}
