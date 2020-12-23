import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  public employee: Employee;
  public id: string;
  public id_employee: string;
  public subscription: Subscription;
  welcome: string;
  show;
  constructor(
    public employeeService: EmployeeService,
    public cookieService: CookieService,
    public routerService: Router
  ) { }

  ngOnInit(): void {
    this.welcome = this.cookieService.get('username');
    if(this.welcome == "admin"){
      this.show = true;
    }
  	$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });

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
    if(this.welcome == 'admin'){
      this.id = this.cookieService.get('DT');
      this.subscription = this.employeeService.getOneEmployee(this.id).subscribe(data => {
        this.employee = data;
      });
    }else{ 
      this.id_employee = this.cookieService.get('id_employee');
      this.subscription = this.employeeService.getOneEmployee(this.id_employee).subscribe(data => {
        this.employee = data;
      });
      
    }
    
  }

  change(){
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
