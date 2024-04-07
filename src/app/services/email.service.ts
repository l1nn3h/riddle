import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from '../models/message.model';
import {EmailConfirmationModel} from '../models/email-confirmation.model';
import {environment} from '../../environments/environment';

const EMAIL_URL: string = environment.emailUrl;
@Injectable({
              providedIn: 'root'
            })
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(message: MessageModel): Observable<EmailConfirmationModel> {
    return this.http.post<EmailConfirmationModel>(EMAIL_URL, message)
  }

}
