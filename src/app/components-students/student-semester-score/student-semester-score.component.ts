import { Component, OnInit } from '@angular/core';  
import * as $ from 'jquery'; 
import { SemesterService } from './../../services/semester.service';
import { ResultService } from './../../services/result.service';
import { ClassService } from './../../services/class.service';
import { SubjectService } from './../../services/subject.service';
import { Semester } from './../../models/semester.model';
import { Results } from './../../models/results.model';
import { ResultStudentSemester } from './../../models/resultstudentsemester.model';
import { Class } from './../../models/class.model'; 
import { Subjects } from './../../models/subjects.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { ResultStudent } from './../../models/resultstudent.model';
import { StudentScoreService } from './../../services/student-score.service';

@Component({
  selector: 'app-student-semester-score',
  templateUrl: './student-semester-score.component.html',
  styleUrls: ['./student-semester-score.component.css']
})
export class StudentSemesterScoreComponent implements OnInit {

  public semester: string; 
  public semesters: Semester[];
  public subject: string; 
  public subjects: Subjects[];
  public results: Results[];
  public resultstudentsemester: ResultStudentSemester[];
  public clazz: Class[];
  public clazzs: Class;
  public subscription: Subscription; 
  public  welcomename: string;
  public resultStudent: ResultStudent[];
  order: string;
  reverse: boolean = true;
  //p: number=1;
  p: number[] = [];
  id: number[] = [];
  public pagesize: number[]=[10];
  pageNo =1;

  constructor(public routerService: Router,
    public semesterService: SemesterService,
    public subjectService: SubjectService,
    public resultService: ResultService,
    public clazzService: ClassService,
    public CookieService: CookieService,
    public studentscoreService: StudentScoreService) { }

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
    
     /////
    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.semesters = data;
      //console.log(data);
      this.semester=this.semesters[0].id_semester;

      this.subscription = this.resultService.getBySemester(this.semester).subscribe(data => {
      this.resultstudentsemester = data; 
       console.log(data); 
      });   

    });

    this.subscription = this.studentscoreService.getStudentScore().subscribe(data => {
      this.resultStudent = data; /*Object.keys(data).map(key => ({type: key, value: data[key] }))*/
     // console.log(data);
    });
    
  }

  onChangeSemester(value){
     this.subscription = this.resultService.getBySemester(value).subscribe(data => {
      this.resultstudentsemester = data;
      console.log(data);
    });
  }

  handlepageChange(event){
     this.pageNo =(event-1)*10+1;
     this.p=event;
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
