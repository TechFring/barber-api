import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { LogEntity } from '@modules/logs/entities';

@Entity('user')
export abstract class UserEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@OneToMany(() => LogEntity, log => log.user)
	public log: LogEntity[];

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

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
