import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Lecturers } from 'src/app/models/lecturers.model';
import { TeacherService } from './../../services/teacher.service';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  
  public lecturer: Lecturers;
  public subscription: Subscription;
  public  welcomename: string;
  public id: string;
  
  constructor(
    public teacherService: TeacherService,
    public CookieService: CookieService,
    public routerService: Router
  ) { }

  ngOnInit(): void {
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

    this.welcomename=this.CookieService.get("usernamelecturers");
    this.id = this.CookieService.get('id_lecturers');
    console.log(this.id);

    this.subscription = this.teacherService.getOneLecturers(this.id).subscribe(data => {
      this.lecturer = data;
      });
  }

  change(){
    localStorage.removeItem('lecturer');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('lecturer');
    this.CookieService.deleteAll();
    window.location.reload();
  }

}
