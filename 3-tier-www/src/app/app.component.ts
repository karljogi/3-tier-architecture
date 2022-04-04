import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SentenceService } from './services/sentence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '3-tier-www';
  sentences: { id: number; sentence: String }[] = [];
  userInputControl = new FormControl('');

  constructor(private readonly sentenceService: SentenceService) {}

  async ngOnInit(): Promise<void> {
    this.sentences = await this.sentenceService.getYodaSencences();
    console.log(this.sentences);
  }

  async onSubmit(): Promise<void> {
    this.sentenceService.createSentence(this.userInputControl.value);
    this.sentences = await this.sentenceService.getYodaSencences();
  }
}
