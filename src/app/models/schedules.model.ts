import {Class} from "./class.model";
import {Skoftes} from "./skoftes.model";
import {Rooms} from "./rooms.model";
import {Lecturers} from "./lecturers.model";

export class Schedules{
	public id_schedules: number;
	public date: Date;
	public description: string;
	public notes: string;
	public id_lecturers: Lecturers;
	public id_skoftes: Skoftes;
	public id_class: Class;
	public id_rooms: Rooms;
}