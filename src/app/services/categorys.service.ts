import { Injectable, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Categorys} from './../models/categorys.model';
import { Token } from './../models/token.model';
import { Observable} from 'rxjs'; 
import { LoginComponent } from './../components-login/login/login.component';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root' 
})
export class CategorysService {

  @Input () login: LoginComponent;

  token=Token.token_access;

  public API : string ='https://serverrunordie.herokuapp.com/categorys';
  //public token : string ='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYwMTkwNjM1OSwiZXhwIjoxNjAxOTkyNzU5fQ.B-N3lI35I_ml6okDDI2lK_ggybSWuQo61kmplmJwPvgCZ4p67jMR6Bg_zwx6JkSNaOU9a0ta5N4kav8dRYXwSQ';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllCategory(): Observable<Categorys[]>{

    //const headers = { 'Authorization': 'Bearer '+this.TOKEN };
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Categorys[]>(this.API +'/findAll', {headers});
  }

  addCategory(category: Categorys) : Observable<Categorys>{
     const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
  	return this.http.post<Categorys>(this.API +'/save', category, {headers});
  }

  updateCategory(category: Categorys): Observable<Categorys> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Categorys>(`${this.API}/update/`, category, {headers});
  }

  getCategory(id_categorys: string): Observable<Categorys>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Categorys>(`${this.API}/getOne/${id_categorys}`, {headers});
  }

   deleteCategory(id_categorys: string): Observable<Categorys>{
     const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.delete<Categorys>(this.API +'/delete' +"/"+ id_categorys, {headers});
  }

  // updateStudent(student: Categorys): Observable<Categorys>{
  // 	return this.http.put<Categorys>(this.API + '/getOne', student);
  // }
}
