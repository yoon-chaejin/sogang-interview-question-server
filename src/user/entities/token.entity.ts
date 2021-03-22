import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({name: "token", schema: ""})
export class Token {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column()
    token: string;

    @Column()
    ttl: number;

    @OneToOne(() => User, user => user.token)
    user: User;
}