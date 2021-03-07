import { Test, TestingModule } from '@nestjs/testing';
import { IntvQuestionService } from './intv-question.service';

describe('IntvQuestionService', () => {
  let service: IntvQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntvQuestionService],
    }).compile();

    service = module.get<IntvQuestionService>(IntvQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
