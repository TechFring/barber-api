import { Response, Request } from 'express';
import { CreateBarberService, ListBarberService, SearchBarberService, UpdateBarberService, UpdateBarberStatusService, UpdateManyBarberStatusService } from '../services';

export abstract class BarberController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const barbers = await ListBarberService.execute(request);
		return response.json(barbers);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const barber = await SearchBarberService.execute(request);
		return response.json(barber);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const barber = await CreateBarberService.execute(request);
		return response.json(barber);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const barber = await UpdateBarberService.execute(request);
		return response.json(barber);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		await UpdateBarberStatusService.execute(request);
		return response.json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyBarberStatusService.execute(request);
		return response.json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		await UpdateBarberStatusService.execute(request, false);
		return response.json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyBarberStatusService.execute(request, false);
		return response.json();
	}
}
