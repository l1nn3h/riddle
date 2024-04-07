import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailService} from '../../../services/email.service';
import {MessageModel} from '../../../models/message.model';
import {ReCaptchaV3Service} from 'ng-recaptcha';
import {EmailConfirmationModel} from '../../../models/email-confirmation.model';

@Component({
             selector: 'app-contact',
             templateUrl: './contact.component.html',
             styleUrls: ['./contact.component.scss'],
           })
export class ContactComponent {

  contactForm: FormGroup;
  message?: MessageModel;
  token: string|undefined;
  confirmedEmail?: EmailConfirmationModel;
  error = false;

  constructor(private formBuilder: FormBuilder,
              private recaptchaV3Service: ReCaptchaV3Service,
              private emailService: EmailService) {
    this.token = undefined;
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.recaptchaV3Service.execute('CONTACT')
      .subscribe({
        next: (token: string) => {
          this.message = {...this.contactForm.value};
          this.message.token = token;
          this.emailService.sendEmail(this.message).subscribe({
            next: (data: EmailConfirmationModel) => {
              this.confirmedEmail = data;
            },
            error: () => {
              this.error = true;
            }});
        },
        error: () => {
          this.error = true;
        }});
  }

}
