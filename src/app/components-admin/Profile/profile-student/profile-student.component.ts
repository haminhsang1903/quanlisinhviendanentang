import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Students } from 'src/app/models/students.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  public student: Students;
  public id: string;
  public subscription: Subscription;
  welcome: string;
  show;

  constructor(
    public studentsService: StudentsService,
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
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }

    this.id = this.cookieService.get('SV');
    this.subscription = this.studentsService.getEditStudent(this.id).subscribe(data => {
      this.student = data;
    });
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
