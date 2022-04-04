import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentenceDto } from './sentence.dto';
import { Sentence } from './sentence.entity';

@Injectable()
export class SentenceService {
  @InjectRepository(Sentence)
  private readonly repository: Repository<Sentence>;

  public getSentence(id: number): Promise<Sentence> {
    return this.repository.findOne(id);
  }

  public getSentences(): Promise<Sentence[]> {
    return this.repository.find();
  }

  public async getYodaSentences(): Promise<Sentence[]> {
    const sentences = await this.repository.find();
    const shuffledSentences = sentences.forEach((sentence) => {
      var words = sentence.sentence.split(' ');

      words = this.shuffleArray(words);

      sentence.sentence = words.join(' ');
    });
    return sentences;
  }

  public async createSentence(body: SentenceDto): Promise<Sentence> {
    const sentence: Sentence = new Sentence();
    sentence.sentence = body.sentence;
    var response = await this.repository.save(sentence);
    return response;
  }
  public async updateSentence(id: number, body: SentenceDto): Promise<void> {
    const sentence: Sentence = new Sentence();
    sentence.sentence = body.sentence;
    await this.repository.update(id, sentence);
  }

  deleteSentence(id: number) {
    this.repository.delete(id);
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
