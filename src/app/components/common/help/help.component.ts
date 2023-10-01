import {Component, Input, OnChanges} from '@angular/core';
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
  protected isAudioPlaying: boolean = false;
  public audioElement: HTMLAudioElement | null = null;

  public icons: string[] = ['fa-solid fa-lightbulb',
                            'fa-solid fa-lightbulb',
                            'fa-solid fa-folder-open'];

  public ngOnChanges(): void {
    for (let help of this.helpOptions) {
      help.type = HelpTypeEnum[help.typeText];
    }
  }

  public revealClue(index: number): void {
    this.helpOptions[index].used = true;
  }

  public play(file: string) :void {
    let audio = new Audio();
    audio.src = file;
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
}
