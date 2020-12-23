import {Schedules} from "./schedules.model";
import {Students} from "./students.model";

export class Attends {
    public id_attends: number;
    public status: number; 
    public notes: string;
    public id_schedules: Schedules;
    public id_students: Students;
}