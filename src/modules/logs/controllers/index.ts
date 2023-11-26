import { Request, Response } from 'express';
import { ListLogService } from '../services';

export abstract class LogController {
	public static async list(request: Request, response: Response): Promise<Response> {
		const logs = await ListLogService.execute(request);
		return response.json(logs);
	}
}
