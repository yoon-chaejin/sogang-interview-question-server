import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Token } from './token.entity';

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

    @OneToOne(() => Token)
    @JoinColumn()
    token: Token;

    @Column({ nullable: false, default: false})
    isAuthenticated: Boolean;
}