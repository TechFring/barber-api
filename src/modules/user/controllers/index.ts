import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { AuthUserService, CreateUserService, ListUserService } from '../services';

export abstract class UserController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const users = await ListUserService.execute(request);
		return response.json(instanceToInstance(users));
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const user = await CreateUserService.execute(request);
		return response.json(instanceToInstance(user));
	}

	public static async auth(request: Request, response: Response): Promise<Response> {
		const session = await AuthUserService.execute(request);
		return response.json(instanceToInstance(session));
	}
}
