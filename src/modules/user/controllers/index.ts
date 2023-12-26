import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { AuthUserService, CreateUserService, ListUserService, SearchUserService, UpdateManyUserStatusService, UpdateUserService, UpdateUserStatusService } from '../services';

export abstract class UserController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const users = await ListUserService.execute(request);
		return response.json(instanceToInstance(users));
	}

	public static async search(request: Request, response: Response): Promise<Response> {
		const user = await SearchUserService.execute(request);
		return response.json(instanceToInstance(user));
	}

	public static async create(request: Request, response: Response): Promise<Response> {
		const user = await CreateUserService.execute(request);
		return response.json(instanceToInstance(user));
	}

	public static async auth(request: Request, response: Response): Promise<Response> {
		const session = await AuthUserService.execute(request);
		return response.json(instanceToInstance(session));
	}

	public static async update(request: Request, response: Response): Promise<Response> {
		const user = await UpdateUserService.execute(request);
		return response.json(instanceToInstance(user));
	}

	public static async active(request: Request, response: Response): Promise<Response> {
		await UpdateUserStatusService.execute(request);
		return response.json();
	}

	public static async activeMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyUserStatusService.execute(request);
		return response.json();
	}

	public static async inactive(request: Request, response: Response): Promise<Response> {
		await UpdateUserStatusService.execute(request, false);
		return response.json();
	}

	public static async inactiveMany(request: Request, response: Response): Promise<Response> {
		await UpdateManyUserStatusService.execute(request, false);
		return response.json();
	}
}
