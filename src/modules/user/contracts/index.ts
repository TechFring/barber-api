import { UserEntity } from '../entities';

export interface IPayload {
	id: string;
	name: string;
	login: string;
	password: string;
	admin: boolean;
}

export interface IUserSession {
	user: UserEntity;
	token: string;
}
