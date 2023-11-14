import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { AuthUserService, CreateUserService, ListUserService } from '../services';

export abstract class UserController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const query = request.query;
		const users = await ListUserService.execute(query);
		return response.json(instanceToInstance(users));
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const body = request.body;
		const labor = await CreateUserService.execute(body);
		return response.json(instanceToInstance(labor));
	}

	public static async auth(request: Request, response: Response): Promise<Response> {
		const { login, password } = request.body;
		const session = await AuthUserService.execute(login, password);
		return response.json(instanceToInstance(session));
	}
}
