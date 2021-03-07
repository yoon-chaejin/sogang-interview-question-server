import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}