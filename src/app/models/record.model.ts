import {Students} from "./students.model";
import {Semester} from "./semester.model";

export class Record {
    public id_record: number;
    public date: Date;
    public content: string;
    public tyle: number;
    public notes: string;
    public id_students: Students;
    public id_semester: Semester;
}