import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RiddleService} from '../../../services/riddle.service';
import {Router} from '@angular/router';

@Component({
             selector: 'app-welcome',
             templateUrl: './welcome.component.html',
             styleUrls: ['./welcome.component.scss'],
           })
export class WelcomeComponent {
  codeForm: FormGroup;
  errorMessageVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private riddleService: RiddleService, private router: Router) {
    this.codeForm = this.formBuilder.group({textInput: ['', [Validators.required]]});
  }

  public submitCode(): void {
    if (this.riddleService.continueGame(this.codeForm.value.textInput)) {
      this.router.navigate(['game']).then();
    } else {
      this.errorMessageVisible = true;
    }
    this.codeForm.reset();
  }

  public startGame(): void {
    this.riddleService.startNewGame();
    this.router.navigate(['game']).then();
  }

  setImageSource(size: string): string {
    const imagePath = '/assets/images/dummy/';
    const language: string = document.getElementsByTagName('html')[0].getAttribute('lang');
    const theme: string = document.getElementsByTagName('body')[0].classList.item(0) === 'light'
                              ? 'dark'
                              : 'light';
    return imagePath + theme + size + language + '.jpg';
  }
}
