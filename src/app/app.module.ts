import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SolutionInputComponent} from './components/common/solution-input/solution-input.component';
import {SolutionHistoryComponent} from './components/common/solution-history/solution-history.component';
import {HelpComponent} from './components/common/help/help.component';
import {PictureScreenComponent} from './components/common/picture-screen/picture-screen.component';
import {WelcomeComponent} from './components/pages/welcome/welcome.component';
import {ErrorComponent} from './components/pages/error/error.component';
import {EndComponent} from './components/pages/end/end.component';
import {LanguageSelectorComponent} from './components/settings/language-selector/language-selector.component';
import {HttpClientModule} from '@angular/common/http';
import {TranslocoRootModule} from './transloco-root.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {GameScreenComponent} from './components/common/game-screen/game-screen.component';
import {GameComponent} from './components/pages/game/game.component';
import {TopicComponent} from './components/common/topic/topic.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ThemeComponent } from './components/settings/theme/theme.component';
import { MenuComponent } from './components/settings/menu/menu.component';
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import {ProgressComponent} from './components/common/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    SolutionInputComponent,
    SolutionHistoryComponent,
    HelpComponent,
    PictureScreenComponent,
    WelcomeComponent,
    ErrorComponent,
    EndComponent,
    LanguageSelectorComponent,
    GameScreenComponent,
    GameComponent,
    TopicComponent,
    ContactComponent,
    ThemeComponent,
    MenuComponent
  ],
              imports: [
                  BrowserModule,
                  AppRoutingModule,
                  HttpClientModule,
                  TranslocoRootModule,
                  FormsModule,
                  ReactiveFormsModule,
                  NgOptimizedImage,
                  RecaptchaV3Module,
                  ProgressComponent,
              ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaSiteKey }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
