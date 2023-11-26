import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '@modules/user/entities';

@Entity('log')
export class LogEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => UserEntity, user => user.log)
	@JoinColumn({ name: 'user_id' })
	public user: UserEntity;

	@Column()
	public user_id: string;

	@Column()
	public description: string;

	@Column()
	public action: number;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
