import { IntvAnswer } from 'src/intv-answer/entities/intv-answer.entity';
import { IntvQuestion } from 'src/intv-question/entities/intv-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Token } from './token.entity';

@Entity({name: "user", schema: ""})
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ nullable: false, length: 100, unique: true })
    email: string;

    @Column({ nullable: false, length: 100, select: false })
    password: string;

    @Column({ nullable: false, length: 100 })
    username: string;

    @OneToOne(() => Token)
    @JoinColumn()
    token: Token;

    @Column({ nullable: false, default: false })
    isAuthenticated: Boolean;

    @ManyToMany(() => IntvQuestion, intvQuestion => intvQuestion.bookmarkedUsers)
    @JoinTable()
    bookmarks: IntvQuestion[];

    @ManyToMany(() => IntvAnswer, intvAnswer => intvAnswer.responsedUsers)
    @JoinTable()
    responses: IntvAnswer[];

    @OneToMany(() => IntvAnswer, intvAnswer => intvAnswer.user)
    intvAnswers: IntvAnswer[];
}