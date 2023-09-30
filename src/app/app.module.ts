import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolutionInputComponent } from './components/common/solution-input/solution-input.component';
import { SolutionHistoryComponent } from './components/common/solution-history/solution-history.component';
import { HelpComponent } from './components/common/help/help.component';
import { PictureScreenComponent } from './components/common/picture-screen/picture-screen.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { EndComponent } from './components/pages/end/end.component';
import { RiddleOneComponent } from './components/pages/riddles/riddle-one/riddle-one.component';
import { LanguageSelectorComponent } from './components/common/language-selector/language-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import { GameScreenComponent } from './components/common/game-screen/game-screen.component';
import { GameComponent } from './components/pages/game/game.component';
import { TopicComponent } from './components/common/topic/topic.component';

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
    TopicComponent
  ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              HttpClientModule,
              TranslocoRootModule,
              FormsModule,
              ReactiveFormsModule,
              NgOptimizedImage,
            ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
