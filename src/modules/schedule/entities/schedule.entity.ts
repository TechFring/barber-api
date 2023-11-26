import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BarberEntity } from '@modules/barber/entities';
import { CustomerEntity } from '@modules/customer/entities';
import { ScheduleLaborEntity } from './schedule-labor.entity';

@Entity('schedule')
export class ScheduleEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@OneToMany(() => ScheduleLaborEntity, schedule_labor => schedule_labor.schedule, { cascade: true })
	public schedule_labor: ScheduleLaborEntity[];

	@ManyToOne(() => BarberEntity, barber => barber.schedule)
	@JoinColumn({ name: 'barber_id' })
	public barber: BarberEntity;

	@ManyToOne(() => CustomerEntity, customer => customer.schedule)
	@JoinColumn({ name: 'customer_id' })
	public customer: CustomerEntity;

	@Column()
	public barber_id: string;

	@Column()
	public customer_id: string;

	@Column()
	public name: string;

	@Column('timestamp with time zone')
	public start_time: Date;

	@Column('timestamp with time zone')
	public end_time: Date;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
