import { IntvAnswer } from 'src/intv-answer/entities/intv-answer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({name: "intv_question", schema: ""})
export class IntvQuestion {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;
    
    @Column({ nullable: false, length: 200 })
    content: string;

    @CreateDateColumn()
    createdDatetime: Date

    @UpdateDateColumn()
    updatedDatetime: Date

    @ManyToMany(() => Tag, tag => tag.intvQuestions)
    @JoinTable()
    tags: Tag[]

    @ManyToMany(() => User, user => user.bookmarks)
    bookmarkedUsers: User[];

    @OneToMany(() => IntvAnswer, intvAnswer => intvAnswer.intvQuestion)
    intvAnswers: IntvAnswer[];
}