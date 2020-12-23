import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  constructor(private http: HttpClient, public cookieservice: CookieService) { }

  url = 'https://serverrunordie.herokuapp.com/sendmailfile';
  
  SendMail(formData: FormData,to: string, subject: string, content: string){ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  let params = new HttpParams();
  params = params.append('to', to);
  params = params.append('subject', subject);
  params = params.append('content', content);
    return this.http.post(this.url, formData ,{headers, params}); 
  }
}
