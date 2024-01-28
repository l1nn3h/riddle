import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {HelpOptionModel} from '../../../models/help-option-model';
import {HelpTypeEnum} from '../../../enums/help-type-enum';

@Component({
             selector: 'app-help',
             templateUrl: './help.component.html',
             styleUrls: ['./help.component.scss'],
           })
export class HelpComponent implements OnChanges {

  protected readonly HelpTypeEnum = HelpTypeEnum;
  @Input() public helpOptions: HelpOptionModel[];
  @Output() public clueUsedEvent = new EventEmitter<number>();
  protected isAudioPlaying: boolean = false;
  public audioElement: HTMLAudioElement | null = null;
  protected isImageShown: boolean = false;
  protected imageUrl: string;
  protected imageXColor: string;

  public icons: string[] = ['fa-solid fa-question',
                            'fa-solid fa-question',
                            'fa-solid fa-folder-open'];

  public ngOnChanges(): void {
    for (let help of this.helpOptions) {
      help.type = HelpTypeEnum[help.typeText];
    }
  }

  public revealClue(index: number): void {
    this.helpOptions[index].used = true;
    this.saveUsedClue(index);
  }

  public play(file: string) :void {
    let audio = new Audio();
    audio.src = file;
    audio.volume = 0.1;
    audio.load();
    audio.play().then(() => {
      this.audioElement = audio;
    });
    audio.addEventListener('ended', () => {
      this.audioElement = null;
    });
  }

  public stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
      this.isAudioPlaying = false;
    }
  }

  public showImage(imgUrl: string, xColor: string): void {
    this.imageUrl = imgUrl;
    this.imageXColor = xColor;
    this.isImageShown = true;
  }

  public closeImage(): void {
    this.isImageShown = false;
  }

  private saveUsedClue(index: number): void {
    this.clueUsedEvent.emit(index);
  }
}
