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
    async findAll(): Promise<IntvQuestion []> {
        return await this.intvQuestionService.findAll();
    }

    @Get(':id')
    async findOneById(@Param() params): Promise<IntvQuestion> {
        return await this.intvQuestionService.findOneById(params.id);
    } 

    @Post()
    async create(@Body() intvQuestionData: CreateIntvQuestionDto): Promise<IntvQuestion []> {
        return await this.intvQuestionService.create(intvQuestionData);
    }

    @Get('tag/:id')
    async findByTagId(@Param('id') id): Promise<IntvQuestion []> {
        return await this.intvQuestionService.findByTagId(id);
    }
}
