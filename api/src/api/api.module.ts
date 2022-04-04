import { Module } from '@nestjs/common';
import { SentenceModule } from './sentence/sentence.module';

@Module({
  imports: [SentenceModule],
})
export class ApiModule {}
