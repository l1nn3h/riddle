import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/pages/welcome/welcome.component';
import {ErrorComponent} from './components/pages/error/error.component';
import {RiddleOneComponent} from './components/pages/riddles/riddle-one/riddle-one.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'first', component: RiddleOneComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule],
          })
export class AppRoutingModule {}
