import {Class} from "./class.model";
import {Major} from "./major.model";
import {NominalClass} from "./nomialclass.model";

export class Students {
    public id_students: string; 
    public name: string;
    public birthday: Date;
    public gender: boolean;
    public email: string;
    public address: string;
    public identity_card: string;
    public avt: string;
    public status: string;
    public id_major: Major;
    public isdelete: boolean;
    public admissions: Date;
    public phone: string;
    public id_nominalclass: NominalClass;
}