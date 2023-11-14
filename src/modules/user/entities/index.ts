import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export abstract class UserEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	public name: string;

	@Column()
	public login: string;

	@Exclude()
	@Column()
	public password: string;

	@Column('boolean')
	public admin: boolean;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}
