import { Test, TestingModule } from '@nestjs/testing';
import { IntvAnswerController } from './intv-answer.controller';

describe('IntvAnswerController', () => {
  let controller: IntvAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntvAnswerController],
    }).compile();

    controller = module.get<IntvAnswerController>(IntvAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
