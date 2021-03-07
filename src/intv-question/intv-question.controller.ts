import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateIntvQuestionDto } from './dto/create-intv-question.dto';
import { IntvQuestion } from './entities/intv-question.entity';
import { IntvQuestionService } from './intv-question.service';

@UseGuards(JwtAuthGuard)
@Controller('intv-question')
export class IntvQuestionController {
    constructor(private readonly intvQuestionService: IntvQuestionService) {}

    @Get()
    findAll(): Promise<IntvQuestion []> {
        return this.intvQuestionService.findAll();
    }

    @Get(':id')
    findOneById(@Param() params): Promise<IntvQuestion> {
        return this.intvQuestionService.findOneById(params.id);
    } 

    @Post()
    async create(@Body() intvQuestionData: CreateIntvQuestionDto): Promise<IntvQuestion> {
        return this.intvQuestionService.create(intvQuestionData);
    }
}
