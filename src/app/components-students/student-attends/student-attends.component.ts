import { Component, OnInit } from '@angular/core'; 
import * as $ from 'jquery'; 
import { SemesterService } from './../../services/semester.service';
import { ResultService } from './../../services/result.service';
import { AttendsService } from './../../services/attends.service';
import { Semester } from './../../models/semester.model';
import { ResultStudentSemester } from './../../models/resultstudentsemester.model';
import { Attends } from './../../models/attends.model'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-student-attends',
  templateUrl: './student-attends.component.html',
  styleUrls: ['./student-attends.component.css']
})
export class StudentAttendsComponent implements OnInit { 
  public semester: string;
  public semesters: Semester[];
  public resultstudentSemester: ResultStudentSemester[];
  public attends: Attends[];
  public subscription: Subscription; 
  public  welcomename: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  //p: number = 1;

  p: number[] = [];
  id: number[] = [];

  constructor(public routerService: Router,
    public semesterService: SemesterService,
    public attendsService: AttendsService,
    public resultService: ResultService,
    public CookieService: CookieService) { }

  ngOnInit(): void {

    this.welcomename=this.CookieService.get("usernamestudent");

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
    ////////
    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.semesters = data;
      console.log(data);
      this.semester=this.semesters[0].id_semester;

      this.subscription = this.resultService.getBySemester(this.semester).subscribe(data => {
      this.resultstudentSemester = data;
      console.log(data);
      })

    })
  }

  onChangeSemester(value){
    this.subscription = this.resultService.getBySemester(value).subscribe(data => {
      this.resultstudentSemester = data;
      console.log(data);
      console.log(this.resultstudentSemester[0].attend);
    })

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
