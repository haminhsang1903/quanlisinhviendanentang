import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthChangePassGuard implements CanActivate {

  constructor(public routerService : Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('changePass')){
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
      }else{
        this.routerService.navigate(['']);
        return false;
      }
  }
  
}
