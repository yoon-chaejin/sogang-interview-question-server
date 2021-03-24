import { IntvQuestion } from "src/intv-question/entities/intv-question.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'intv_answer', schema: ''})
export class IntvAnswer {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ nullable: false, length: 1000 })
    content: string;

    @CreateDateColumn()
    createdDatetime: Date;

    @UpdateDateColumn()
    updatedDatetime: Date;

    @Column()
    responseCount: number;

    @ManyToMany(() => User, user => user.responses)
    responsedUsers: User[];

    @ManyToOne(() => IntvQuestion, intvQuestion => intvQuestion.intvAnswers)
    intvQuestion: IntvQuestion;

    @ManyToOne(() => User, user => user.intvAnswers)
    user: User;
}