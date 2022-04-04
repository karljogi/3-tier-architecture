import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SentenceDto } from './Sentence.dto';
import { Sentence } from './sentence.entity';
import { SentenceService } from './sentence.service';

@Controller('/sentences')
@ApiTags('sentences')
export class SentenceController {
  @Inject(SentenceService)
  private readonly service: SentenceService;

  @Get('/yoda')
  public getYodaSentences(): Promise<Sentence[]> {
    return this.service.getYodaSentences();
  }

  @Get('/:id')
  public getSentence(@Param('id', ParseIntPipe) id: number): Promise<Sentence> {
    return this.service.getSentence(id);
  }

  @Get('/')
  public getSentences(): Promise<Sentence[]> {
    return this.service.getSentences();
  }

  @Post()
  public createSentence(@Body() body: SentenceDto): Promise<Sentence> {
    return this.service.createSentence(body);
  }

  @Put('/:id')
  public updateSentence(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SentenceDto,
  ): Promise<void> {
    return this.service.updateSentence(id, body);
  }

  @Delete('/:id')
  public deleteSentence(@Param('id', ParseIntPipe) id: number): void {
    return this.service.deleteSentence(id);
  }
}
