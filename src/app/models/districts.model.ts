import { Wards } from './wards.model';
export class Districts{
	public id: number;
	public name: string;
	public project: Object[];
	public streets: Object[];
	public wards: Wards[];
}