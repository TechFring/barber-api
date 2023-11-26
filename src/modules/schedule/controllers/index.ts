import { Request, Response } from 'express';
import CreateScheduleService from '../services/create-schedule.service';
import ListScheduleService from '../services/list-schedule.service';
import SearchScheduleService from '../services/search-schedule.service';
import ValidateScheduleService from '../services/validate-schedule.service';
import DeleteScheduleService from '../services/delete-schedule.service';
import UpdateScheduleService from '../services/update-schedule.service';

export abstract class ScheduleController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const schedules = await ListScheduleService.execute(request);
		return response.json(schedules);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const schedule = await SearchScheduleService.execute(request);
		return response.json(schedule);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const schedule = await CreateScheduleService.execute(request);
		return response.json(schedule);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const schedule = await UpdateScheduleService.execute(request);
		return response.json(schedule);
	}

	public static async validate(request: Request, response: Response): Promise<Response> {
		const validate = await ValidateScheduleService.execute(request);
		return response.json(validate);
	}

	public static async delete(request: Request, response: Response): Promise<Response> {
		await DeleteScheduleService.execute(request);
		return response.status(204).json();
	}
}
