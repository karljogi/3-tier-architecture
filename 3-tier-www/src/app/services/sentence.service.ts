import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SentenceService {
  constructor(private readonly apiService: ApiService) {}

  async createSentence(sentence: String) {
    return await this.apiService.post('/sentences', { sentence });
  }

  async getSencences() {
    return await this.apiService.get('/sentences');
  }

  async getYodaSencences() {
    return await this.apiService.get('/sentences/yoda');
  }
}
