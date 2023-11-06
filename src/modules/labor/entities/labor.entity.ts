import ScheduleLaborEntity from '@modules/schedule/entities/schedule-labor.entity';
import ScheduleEntity from '@modules/schedule/entities/schedule.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('labor')
export default class LaborEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@OneToMany(() => ScheduleLaborEntity, schedule_labor => schedule_labor.schedule)
	public schedule_labor: ScheduleEntity[];

	@Column()
	public name: string;

	@Column('int')
	public duration: number;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}
