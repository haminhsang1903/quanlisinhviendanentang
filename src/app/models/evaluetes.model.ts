import {Lecturers} from "./lecturers.model";
import {Students} from "./students.model";
import { Class } from './class.model';

export class Evaluetes { 
    public id_evaluetes: number;
    public option_1: number;
    public option_2: number;
    public option_3: number;
    public option_4: number;
    public option_5: number;
    public notes: string;
    public isdelete: boolean;
    public id_lecturers: Lecturers;
    public id_students: Students;
    public id_class: Class;
}