import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Students } from 'src/app/models/students.model';
import { StudentsService } from 'src/app/services/students.service';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  public student: Students;
  public subscription: Subscription;
  public  welcomename: string;
  public id: string;
  
  constructor(
    public studentsService: StudentsService,
    public CookieService: CookieService,
    public routerService: Router
  ) { }

  ngOnInit(): void {

    this.welcomename=this.CookieService.get("usernamestudent");
    this.id = this.CookieService.get('id_student');
    console.log(this.CookieService.get('id_student'));
  //script menu slider
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

    this.subscription = this.studentsService.getEditStudent(this.id).subscribe(data => {
      this.student = data;
      });

  }

  change(){
    localStorage.removeItem('student');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('student');
    this.CookieService.deleteAll();
    window.location.reload();
  }

}
