import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import LaborEntity from '@modules/labor/entities/labor.entity';
import ScheduleEntity from './schedule.entity';

@Entity('schedule_labor')
export default class ScheduleLaborEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@ManyToOne(() => ScheduleEntity, schedule => schedule.schedule_labor)
	@JoinColumn({ name: 'schedule_id' })
	public schedule: ScheduleEntity;

	@ManyToOne(() => LaborEntity, schedule => schedule.schedule_labor)
	@JoinColumn({ name: 'labor_id' })
	public labor: LaborEntity;

	@Column()
	public schedule_id: string;

	@Column()
	public labor_id: string;
}
