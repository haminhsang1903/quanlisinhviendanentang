import { Roles } from "./role.model";
export class Account{ 
    public id: number;
    public username: string;
    public password: string;
    public active: boolean;
    public isdelete: boolean;
    public roles: Roles[];
}