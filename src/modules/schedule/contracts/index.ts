export interface ISchedulePayload {
	id: string;
	name: string;
	start_time: Date;
	barber_id: string;
	customer_id: string;
	labors: string[];
}

export interface IScheduleSuggestion {
	start_time: Date;
	end_time: Date;
}