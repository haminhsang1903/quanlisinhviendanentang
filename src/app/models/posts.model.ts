import {Categorys} from "./categorys.model";

export class Posts {
    public id_post: number;
    public title: string;
    public description: string;
    public datepost: Date;
    public userpost: string;
    public isdelete: boolean;
    public href: string;
    public id_categorys: Categorys;

}