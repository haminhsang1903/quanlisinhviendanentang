import { Injectable } from '@angular/core';  
import { HttpHeaders } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http'   
import { Observable } from 'rxjs'; 
import {CookieService} from 'ngx-cookie-service';
import { Results } from '../models/results.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root'
})
export class TeacherImportscoreService {

  constructor(private http: HttpClient, public cookieservice: CookieService) { }

  url = 'https://serverrunordie.herokuapp.com/api/import/fileExcel';  
  url1 = 'https://serverrunordie.herokuapp.com/result/getFileRs'; 
  
  UploadExcel(formData: FormData, id_class: string) {  
    //let headers = new HttpHeaders(); 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  
    return this.http.post(this.url +`/${id_class}`, formData, {headers})  
  }

  getFileRs(id_class: string){
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get(`${this.url1}/${id_class}`, {headers});
  }


}
