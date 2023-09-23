import { Component } from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  currentLanguage:string = "en";

  constructor(private translateService: TranslocoService) {
  }

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translateService.setActiveLang(language);
    console.log("Language changed to " + language);
  }

}
