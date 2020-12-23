import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { Token } from './../../models/token.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Account } from 'src/app/models/account.model';
import { MyResponse } from 'src/app/models/response.model';
import { EvaluesService } from './../../services/evalues.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public response: MyResponse;
  public account: Account;
  public subscription: Subscription;
  token = Token.token_access;
  public message: string;
  public messageErr: string;
  public messageErr1: string;



  constructor(public loginService: LoginService,
    public routerService: Router,
    public http: HttpClient,
    public cookieservice: CookieService,
    public evaluesService: EvaluesService) { }

  ngOnInit(): void {
    //localStorage.setItem('login', JSON.stringify(''));
    // validation form
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    this.response = new MyResponse();
    this.account = new Account();
    if(this.cookieservice.getAll() !=null){
      this.cookieservice.deleteAll();
    }
  }



  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
  }

  onLogin() {
    if (this.account.username == null) {
      this.messageErr = "Vui lòng nhập tài khoản!";
    }
    if (this.account.password == null) {
      this.messageErr1 = "Vui lòng nhập mật khẩu!";
    }
    if (this.account.username != null && this.account.password != null) {
      this.subscription = this.loginService.login(this.account).subscribe(data => {
        this.response = data;
        // console.log(this.response);
        this.cookieservice.set('token', this.response.accessToken);
        if (this.response.roles == 'ROLE_SINH_VIEN') {
          this.subscription = this.loginService.getUsername(data.username).subscribe(a => {
            localStorage.removeItem('login');
            //localStorage.setItem('student', JSON.stringify(this.response));
            this.cookieservice.set('usernamestudent', a.name);
            this.cookieservice.set("user", a.email);
            this.cookieservice.set("id_student", a.id_students)
            if (this.response.active == false) {
              localStorage.setItem('changePass', JSON.stringify(this.response));
              this.routerService.navigateByUrl('change-password');
            } else {
              this.subscription = this.evaluesService.getClazzEvalue().subscribe(evalues => {
                if (evalues.length > 0) {
                  localStorage.setItem('student', JSON.stringify(this.response));
                  this.routerService.navigateByUrl('student/list-evalue');
                } else {
                  localStorage.setItem('student', JSON.stringify(this.response));
                  this.routerService.navigateByUrl('student/news');
                }
              });
            }
          });
        }
        if (this.response.roles == 'ROLE_GIANG_VIEN') {
          this.subscription = this.loginService.getUsernameLecturer(data.username).subscribe(lecturers => {
            localStorage.removeItem('login');
            this.cookieservice.set('usernamelecturers', lecturers.name);
            this.cookieservice.set("user", lecturers.email);
            this.cookieservice.set("id_lecturers", lecturers.id_lecturers);
            if (this.response.active == false) {
              localStorage.setItem('changePass', JSON.stringify(this.response));
              this.routerService.navigateByUrl('change-password');
            } else {

              localStorage.setItem('lecturer', JSON.stringify(this.response));
              this.routerService.navigateByUrl('teacher/dashboard');
            }
          });
        }
        if (this.response.roles == 'ROLE_DAO_TAO') {
          this.subscription = this.loginService.getUsernamDaoTao(data.username).subscribe(daotao => {
            localStorage.removeItem('login');
            this.cookieservice.set("user", daotao.email);
            this.cookieservice.set('username', daotao.name);
            this.cookieservice.set("id_employee", daotao.id_employee);
            if (this.response.active == false) {
              localStorage.setItem('changePass', JSON.stringify(this.response));
              this.routerService.navigateByUrl('change-password');
            } else {

              localStorage.setItem('admin', JSON.stringify(this.response));
              this.routerService.navigateByUrl('admin/dashboard');
            }
            
          });
        }
        if (this.response.roles == 'ROLE_IT') {
          localStorage.removeItem('login');
          localStorage.setItem('admin', JSON.stringify(this.response));
          this.cookieservice.set('username', this.response.username);
          this.routerService.navigateByUrl('admin/dashboard');
        }
      }
        ,
        (error) => {
          this.message = "Tài khoản hoặc mật khẩu sai!";
        }
      )
    }
  }

}
