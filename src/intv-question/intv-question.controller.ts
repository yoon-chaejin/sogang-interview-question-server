import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateIntvQuestionDto } from './dto/create-intv-question.dto';
import { CreateIntvQuestionsWithTagsDto } from './dto/create-intv-questions-with-tags.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
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

    @Post('with-tags')
    async createIntvQuestionsWithTags(@Body() intvQuestionsWithTagsData: CreateIntvQuestionsWithTagsDto) {
        await this.intvQuestionService.createIntvQuestionsWithTags(intvQuestionsWithTagsData);
        return "SUCESS";
    }

    @Get('tag/:id')
    async findByTagId(@Param('id') id): Promise<IntvQuestion []> {
        return await this.intvQuestionService.findByTagId(id);
    }

    @Put('/bookmark')
    async updateBookmark(@Body() bookmarkData: UpdateBookmarkDto): Promise<any> {
        return await this.intvQuestionService.updateBookmark(bookmarkData);
    }
}
