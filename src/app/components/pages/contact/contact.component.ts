import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailService} from '../../../services/email.service';
import {Router} from '@angular/router';
import {MessageModel} from '../../../models/message.model';

@Component({
             selector: 'app-contact',
             templateUrl: './contact.component.html',
             styleUrls: ['./contact.component.scss'],
           })
export class ContactComponent {

  contactForm: FormGroup;
  messageSent: boolean = false;
  message?: MessageModel;

  constructor(private formBuilder: FormBuilder,
              private emailService: EmailService,
              private router: Router) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      message: ['', Validators.required],
      image: '',
    });
  }

  onSubmit(): void {
    const data = {...this.contactForm.value};
    console.log(data);

    //TODO message sending logic
    this.messageSent = true;
    this.message = {
      name: data.name,
      email: data.email,
      message: data.message,
      imageUrl: data.imageUrl
                ? data.imageUrl
                : 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb',
    };
  }

}
