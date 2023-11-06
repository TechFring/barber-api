import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import ScheduleLaborEntity from './schedule-labor.entity';
import BarberEntity from '@modules/barber/entities/barber.entity';
import CustomerEntity from '@modules/customer/entities/customer.entity';

@Entity('schedule')
export default class ScheduleEntity {
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

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}
