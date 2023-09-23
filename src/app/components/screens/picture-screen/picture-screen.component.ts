import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-picture-screen',
  templateUrl: './picture-screen.component.html',
  styleUrls: ['./picture-screen.component.scss']
})
export class PictureScreenComponent {

@Input() pictureSource:string;
}
