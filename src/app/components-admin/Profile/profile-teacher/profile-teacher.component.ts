import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Lecturers } from 'src/app/models/lecturers.model';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {

  public lecturer: Lecturers;
  public subscription: Subscription;
  public  welcomename: string;
  public id: string;
  welcome: string;
  show;

  constructor(
    public teacherService: TeacherService,
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

    this.id = this.cookieService.get('GV');

    this.subscription = this.teacherService.getOneLecturers(this.id).subscribe(data => {
      this.lecturer = data;
      });
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
