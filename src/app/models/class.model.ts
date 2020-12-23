import { Semester } from "./semester.model";
import { Subjects } from "./subjects.model";

export class Class{
    public id_class: string;
    public name: string;
    public status: boolean;
    public id_subjects: Subjects;
    public id_semester: Semester;
}