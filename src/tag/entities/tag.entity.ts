import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tag", schema: ""})
export class Tag {
    @PrimaryGeneratedColumn({ name: "id"})
    id: number;

    @Column({ nullable: false, length: 45, unique: true})
    name: string;
}