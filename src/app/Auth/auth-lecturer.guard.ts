import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLecturerGuard implements CanActivate {

  constructor(public routerService : Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('lecturer')){
        return true;
      }else if(localStorage.getItem('changePass')){
        this.routerService.navigate(['change-password']);
        return true;
      }else if(localStorage.getItem('admin')){
        this.routerService.navigate(['admin/dashboard']);
        return true;
      }else if(localStorage.getItem('student')){
        this.routerService.navigate(['student/news']);
        return true;
      }else{
        this.routerService.navigate(['']);
        return false;
      }
  }
  
}
