import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
	constructor(
    public cookieService: CookieService,
    public routerService: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('login')){
        return true;
      }else if(localStorage.getItem('changePass')){
        this.routerService.navigate(['change-password']);
        return true;
      }else if(localStorage.getItem('admin')){
        this.routerService.navigate(['admin/dashboard']);
        return true;
      }else if(localStorage.getItem('lecturer')){
        this.routerService.navigate(['teacher/dashboard']);
        return true;
      }else if(localStorage.getItem('student')){
        this.routerService.navigate(['student/news']);
        return true;
      }
      else{
        this.routerService.navigate(['403']);
        return false;
      }
  }
  
}
