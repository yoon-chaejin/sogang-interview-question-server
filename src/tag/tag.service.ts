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
        return await this.tagRepository
            .createQueryBuilder('tag')
            .innerJoinAndSelect('tag.intvQuestions', 'intv_question')
            .groupBy('tag.id')
            .select('tag.id', 'id')
            .addSelect('tag.name', 'name')
            .addSelect('COUNT("tag.id")', 'count')
            .getRawMany();
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
    
    async findOrCreateTagByTagName(tagName: string): Promise<Tag> {
        let tag = await this.tagRepository.findOneByName(tagName);

        if (!tag) {
            tag = new Tag();
            tag.name = tagName;
            tag = await this.tagRepository.save(tag);
        }
        
        return tag;
    }
}
