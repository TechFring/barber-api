declare namespace Express {
  export interface Request {
    user: {
      id: string;
			name: string;
			login: string;
			admin: boolean;
			active: boolean;
			created_at: Date;
			updated_at: Date;
    };
  }
}
