import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	public name: string;

	@Column()
	public login: string;

	@Exclude()
	@Column()
	public password: string;

	@Column('int')
	public level: number;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
