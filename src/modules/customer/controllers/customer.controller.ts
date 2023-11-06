import { Request, Response } from 'express';
import CreateCustomerService from '../services/create-customer.service';
import UpdateCustomerStatusService from '../services/update-customer-status.service';
import UpdateManyCustomerStatusService from '../services/update-many-customer-status.service';
import ListCustomerService from '../services/list-customer.service';
import SearchCustomerService from '../services/search-customer.service';
import UpdateCustomerService from '../services/update-customer.service';

export default abstract class CustomerController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const query = request.query;
		const customers = await ListCustomerService.execute(query);
		return response.json(customers);
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const customer = await SearchCustomerService.execute(id);
		return response.json(customer);
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const customer = await CreateCustomerService.execute(body);
		return response.json(customer);
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		const body = request.body;
		const customer = await UpdateCustomerService.execute({ id, ...body });
		return response.json(customer);
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateCustomerStatusService.execute(id);
		return response.status(204).json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyCustomerStatusService.execute(ids);
		return response.status(204).json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;
		await UpdateCustomerStatusService.execute(id, false);
		return response.status(204).json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		const ids = request.body.ids;
		await UpdateManyCustomerStatusService.execute(ids, false);
		return response.status(204).json();
	}
}
