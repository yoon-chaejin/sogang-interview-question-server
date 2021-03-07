import { Test, TestingModule } from '@nestjs/testing';
import { IntvQuestionController } from './intv-question.controller';

describe('IntvQuestionController', () => {
  let controller: IntvQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntvQuestionController],
    }).compile();

    controller = module.get<IntvQuestionController>(IntvQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
