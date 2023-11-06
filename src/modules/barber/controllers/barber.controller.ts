import { Response, Request } from 'express';
import CreateBarberService from '../services/create-barber.service';
import ListBarberService from '../services/list-barber.service';
import UpdateBarberService from '../services/update-barber.service';
import SearchBarberService from '../services/search-barber.service';
import UpdateBarberStatusService from '../services/update-barber-status.service';
import UpdateManyBarberStatusService from '../services/update-many-barber-status.service';

export abstract class BarberController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const query = request.query;
		const barbers = await ListBarberService.execute(query);
		return response.json(barbers);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const barber = await SearchBarberService.execute(id);
		return response.json(barber);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const barber = await CreateBarberService.execute(body);
		return response.json(barber);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const body = request.body;
		const barber = await UpdateBarberService.execute({ id, ...body });
		return response.json(barber);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateBarberStatusService.execute(id);
		return response.status(204).json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyBarberStatusService.execute(ids);
		return response.status(204).json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateBarberStatusService.execute(id, false);
		return response.status(204).json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyBarberStatusService.execute(ids, false);
		return response.status(204).json();
	}
}
