import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: "user", schema: ""})
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ nullable: false, length: 100, unique: true })
    email: string;

    @Column({ nullable: false, length: 100 })
    password: string;

    @Column({ nullable: false, length: 100 })
    username: string;
}