import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { User } from './../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public subscription: Subscription;
  public user: User;
  public  welcomename: string;
  public users: string;
  public confirmpass: string;
  message: string;
  constructor( 
    public loginService: LoginService,
    public CookieService: CookieService,
    public router: Router
  ) { }

  ngOnInit(): void {
  	//script menu slider
  	$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });
    this.welcomename=this.CookieService.get("username");    
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
      
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }

  $(".reveal").on('click',function() {
      var $pwd = $(".pwd");
      if ($pwd.attr('type') === 'password') {
          $pwd.attr('type', 'text');
      } else {
          $pwd.attr('type', 'password');
      }
  });

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

    // clear form
    $(document).ready(function () {
      $('#mod_cls').on('click', function () {
        $('#Q_A').trigger("reset");
        console.log($('#Q_A'));
      })
    });


  this.users = this.CookieService.get('user');
  this.user = new User();
  this.user.username = this.users;
   
  }
  update(){
    if(this.confirmpass == this.user.password){
      this.subscription = this.loginService.changePassword(this.user).subscribe((data: User)=>{
        this.user = data;
        localStorage.removeItem('changePass');
        this.CookieService.deleteAll();
        this.router.navigate(['']);
      })
    } else
    /*this.message='Mật khẩu không trùng khớp! Vui lòng nhập lại!';*/
    alert("Mật khẩu không trùng khớp! Vui lòng nhập lại!");
  }
}
