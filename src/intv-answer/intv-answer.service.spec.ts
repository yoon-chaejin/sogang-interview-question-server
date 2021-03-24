import { Test, TestingModule } from '@nestjs/testing';
import { IntvAnswerService } from './intv-answer.service';

describe('IntvAnswerService', () => {
  let service: IntvAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntvAnswerService],
    }).compile();

    service = module.get<IntvAnswerService>(IntvAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
