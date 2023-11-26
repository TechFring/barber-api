import { UserEntity } from '../entities';

export interface IUserSession {
	user: UserEntity;
	token: string;
}
