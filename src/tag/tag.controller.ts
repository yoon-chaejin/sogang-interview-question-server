import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAll(): Promise<Tag []> {
        return await this.tagService.findAll();
    }

    @Get(':id')
    async findOneById(@Param() params): Promise<Tag> {
        return await this.tagService.findOneById(params.id);
    }

    @Post()
    async create(@Body() tagData: CreateTagDto): Promise<Tag> {
        return this.tagService.create(tagData);
    }
}
