import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    verificationToken: string;
    @Column()
    email: string;
    @Column({default: false})
    isVerified: boolean;
    
    @BeforeInsert()
    async hashPassword() {
    //    this.password = await bcrypt.hash(this.password, 10);
        this.password = await bcrypt.hash('xyz', 10);
    }
}