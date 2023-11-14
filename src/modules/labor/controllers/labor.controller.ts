import { Request, Response } from 'express';
import CreateLaborService from '../services/create-labor.service';
import UpdateLaborStatusService from '../services/update-labor-status.service';
import ListLaborService from '../services/list-labor.service';
import SearchLaborService from '../services/seach-labor.service';
import UpdateManyLaborStatusService from '../services/update-many-labor-status.service';
import UpdateLaborService from '../services/update-labor.service';

export default abstract class LaborController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const query = request.query;
		const labors = await ListLaborService.execute(query);
		return response.json(labors);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const labor = await SearchLaborService.execute(id);
		return response.json(labor);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const labor = await CreateLaborService.execute(body);
		return response.json(labor);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const body = request.body;
		const labor = await UpdateLaborService.execute({ id, ...body });
		return response.json(labor);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateLaborStatusService.execute(id);
		return response.status(204).json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyLaborStatusService.execute(ids);
		return response.status(204).json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateLaborStatusService.execute(id, false);
		return response.status(204).json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyLaborStatusService.execute(ids, false);
		return response.status(204).json();
	}
}
