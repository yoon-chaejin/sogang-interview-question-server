import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './repository/TagRepository';

@Injectable()
export class TagService {
    constructor (
        @InjectRepository(TagRepository)
        private readonly tagRepository: TagRepository,
    ) {}

    async findAll(): Promise<Tag []> {
        return await this.tagRepository.find();
    }

    async findOneById(id: number): Promise<Tag> {
        return await this.tagRepository.findOneById(id);
    }

    async create(createTagData: CreateTagDto): Promise<Tag> {
        const { name } = createTagData;

        const tag = new Tag();
        tag.name = name;
        
        await this.tagRepository.save(tag);

        return tag;
    }
}
