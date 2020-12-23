import {Schedules} from './schedules.model';

export class Rooms{
	public id_rooms: number;
	public name: string;
	public notes: string;
	id_schedules: Schedules[];
}