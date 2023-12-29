declare namespace Express {
  export interface Request {
    user: {
      id: string;
			name: string;
			login: string;
			level: number;
			active: boolean;
			created_at: Date;
			updated_at: Date;
    };
  }
}
