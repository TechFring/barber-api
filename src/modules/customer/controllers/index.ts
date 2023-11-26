import { Request, Response } from 'express';
import { CreateCustomerService, ListCustomerService, SearchCustomerService, UpdateCustomerService, UpdateCustomerStatusService, UpdateManyCustomerStatusService } from '../services';

export abstract class CustomerController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const customers = await ListCustomerService.execute(request);
		return response.json(customers);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const customer = await SearchCustomerService.execute(request);
		return response.json(customer);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const customer = await CreateCustomerService.execute(request);
		return response.json(customer);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const customer = await UpdateCustomerService.execute(request);
		return response.json(customer);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		await UpdateCustomerStatusService.execute(request);
		return response.json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyCustomerStatusService.execute(request);
		return response.json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		await UpdateCustomerStatusService.execute(request, false);
		return response.json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyCustomerStatusService.execute(request, false);
		return response.json();
	}
}
