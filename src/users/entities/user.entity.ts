import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
}