import { IntvQuestion } from "src/intv-question/entities/intv-question.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tag", schema: ""})
export class Tag {
    @PrimaryGeneratedColumn({ name: "id"})
    id: number;

    @Column({ nullable: false, length: 45, unique: true})
    name: string;

    @ManyToMany(() => IntvQuestion, intvQuestion => intvQuestion.tags)
    intvQuestions: IntvQuestion[];
}