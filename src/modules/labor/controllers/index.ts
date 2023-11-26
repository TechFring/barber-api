import { Request, Response } from 'express';
import { CreateLaborService, ListLaborService, SearchLaborService, UpdateLaborService, UpdateLaborStatusService, UpdateManyLaborStatusService } from '../services';

export abstract class LaborController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const labors = await ListLaborService.execute(request);
		return response.json(labors);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const labor = await SearchLaborService.execute(request);
		return response.json(labor);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const labor = await CreateLaborService.execute(request);
		return response.json(labor);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const labor = await UpdateLaborService.execute(request);
		return response.json(labor);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		await UpdateLaborStatusService.execute(request);
		return response.json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyLaborStatusService.execute(request);
		return response.json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		await UpdateLaborStatusService.execute(request, false);
		return response.json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyLaborStatusService.execute(request, false);
		return response.json();
	}
}
