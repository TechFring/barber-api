import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ScheduleLaborEntity, ScheduleEntity } from '@modules/schedule/entities';

@Entity('labor')
export class LaborEntity {
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

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}
