import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ScheduleEntity } from '@modules/schedule/entities';

@Entity('customer')
export class CustomerEntity {
	@PrimaryGeneratedColumn()
	public id: string;
	
	@OneToMany(() => ScheduleEntity, schedule => schedule.customer)
	public schedule: ScheduleEntity[];

	@Column()
	public name: string;

	@Column()
	public phone: string;

	@Column()
	public email: string;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
