import {Class} from "./class.model";
import {Results} from "./results.model";
import {Attends} from "./attends.model";

export class ResultStudentSemester {
    public clazz: Class;
    public result: Results[]; 
    public attend: Attends[];
    public score: number;
    public absent: number;
    public statusAttend: string;
}