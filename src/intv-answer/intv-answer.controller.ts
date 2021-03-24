import { Body, Controller, Post } from '@nestjs/common';
import { CreateIntvAnswerDto } from './dto/create-intv-answer.dto';
import { IntvAnswer } from './entities/intv-answer.entity';
import { IntvAnswerService } from './intv-answer.service';

@Controller('intv-answer')
export class IntvAnswerController {
    constructor (
        private readonly intvAnswerService: IntvAnswerService,
    ) {}

    @Post()
    async create(@Body() intvAnswerData: CreateIntvAnswerDto): Promise<IntvAnswer> {
        return await this.intvAnswerService.create(intvAnswerData);
    }
}
