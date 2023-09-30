import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/pages/welcome/welcome.component';
import {ErrorComponent} from './components/pages/error/error.component';
import {GameComponent} from './components/pages/game/game.component';
import {EndComponent} from './components/pages/end/end.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'end', component: EndComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule],
          })
export class AppRoutingModule {}
