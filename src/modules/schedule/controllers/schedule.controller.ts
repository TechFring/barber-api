import { Request, Response } from 'express';
import CreateScheduleService from '../services/create-schedule.service';
import ListScheduleService from '../services/list-schedule.service';
import SearchScheduleService from '../services/search-schedule.service';
import ValidateScheduleService from '../services/validate-schedule.service';
import DeleteScheduleService from '../services/delete-schedule.service';
import UpdateScheduleService from '../services/update-schedule.service';

export default abstract class ScheduleController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const startTime = new Date(request.query['start_time'] as string);
		const endTime = new Date(request.query['end_time'] as string);
		const schedules = await ListScheduleService.execute(startTime, endTime);
		return response.json(schedules);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const schedule = await SearchScheduleService.execute(id);
		return response.json(schedule);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const schedule = await CreateScheduleService.execute(body);
		return response.json(schedule);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const body = request.body;
		const schedule = await UpdateScheduleService.execute({ id, ...body });
		return response.json(schedule);
	}

	public static async validate(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const validate = await ValidateScheduleService.execute(body);
		return response.json(validate);
	}

	public static async delete(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await DeleteScheduleService.execute(id);
		return response.status(204).json();
	}
}
