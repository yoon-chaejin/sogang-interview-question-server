import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateIntvAnswerDto } from './dto/create-intv-answer.dto';
import { IntvAnswer } from './entities/intv-answer.entity';
import { IntvAnswerService } from './intv-answer.service';

@UseGuards(JwtAuthGuard)
@Controller('intv-answer')
export class IntvAnswerController {
    constructor (
        private readonly intvAnswerService: IntvAnswerService,
    ) {}

    @Post()
    async create(@Body() intvAnswerData: CreateIntvAnswerDto): Promise<IntvAnswer> {
        return await this.intvAnswerService.create(intvAnswerData);
    }
    
    @Put(':id')
    async updateIntvAnswer(@Param('id') id, @Body() content: string): Promise<IntvAnswer> {
        return await this.intvAnswerService.updateIntvAnswer(id, content);
    }

    @Delete(':id')
    async deleteIntvAnswer(@Param('id') id): Promise<DeleteResult> {
        return await this.intvAnswerService.deleteIntvAnswer(id);
    }
}
