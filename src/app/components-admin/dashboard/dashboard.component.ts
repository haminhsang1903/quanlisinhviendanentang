import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticalService } from './../../services/statistical.service';
import { AccountService } from './../../services/account.service';
import { PostService } from './../../services/post.service';
import { MajorService } from './../../services/major.service';
import { SubjectService } from './../../services/subject.service';
import { StudentsService } from './../../services/students.service';
import { TeacherService } from './../../services/teacher.service';
import { EmployeeService } from './../../services/employee.service';
import { SemesterService } from './../../services/semester.service';
import { ClassService } from './../../services/class.service';
import { StudentByYear } from './../../models/studentByYear.model';
import { EvaluesService } from './../../services/evalues.service';
import { avgEvaluetesLec } from './../../models/avgEvaluetesLec.model';
import { StudentByMajor } from './../../models/studentByMajor.model';
import { StudentGreat } from './../../models/studentGreat.model';
import { Account } from './../../models/account.model';
import { Posts } from './../../models/posts.model';
import { Major } from './../../models/major.model';
import { Subjects } from './../../models/subjects.model';

import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public studentByYear: StudentByYear[];
  public studentGreat: StudentGreat[];
  public avgEvaluetesLec: Array<avgEvaluetesLec> = [];
  public studentByMajor: StudentByMajor[];
  public subscription: Subscription; 
  public primaryXAxisyear: Object;
  public primaryXAxismajor: Object;
  public welcome: string;
  p: number = 1;
  totalRecords: number;
  page: number =1;s
  name: string;
  search;
  public pagesize = 10;
  order: string;
  show;
  public titile: string;
  public SumAccount: number;
  public SumPost: number;
  public SumMajor: number;
  public SumSubject: number;
  public SumStudent: number;
  public SumTeacher: number;
  public SumEmployee: number;
  public SumSemeater: number;
  public SumClass: number;
  public id_major: string;
  
  constructor(
    public cookie: CookieService, 
    public routerService: Router,
    public statisticalService: StatisticalService,
    public accountService: AccountService,
    public postService: PostService,
    public majorService: MajorService,
    public subjectService: SubjectService,
    public evaluesService : EvaluesService,
    public studentsService: StudentsService,
    public teacherService: TeacherService,
    public employeeService: EmployeeService,
    public semesterService: SemesterService,
    public classService: ClassService

  ) { }

  ngOnInit() {
    this.welcome = this.cookie.get('username');
    if (this.welcome == "admin") {
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

    this.subscription = this.statisticalService.gettotalStudentByYear().subscribe(data => {
      this.studentByYear = data;
    });

    this.subscription = this.statisticalService.gettotalStudentMajor().subscribe(data => {
      this.studentByMajor = data;
    });

    this.subscription = this.statisticalService.getbestSemester().subscribe(data => {
      this.studentGreat = data;
      console.log(data);
    });

    this.subscription = this.accountService.getAllAccount().subscribe(data => {
      this.SumAccount = data.length;
    });

    this.subscription = this.postService.getAllPost().subscribe(data => {
      this.SumPost = data.length;
    });

    this.subscription = this.majorService.getAllMajor().subscribe(data => {
      this.SumMajor = data.length;
    });

    this.subscription = this.subjectService.getAllSubject().subscribe(data => {
      this.SumSubject = data.length;
    });

    this.subscription = this.studentsService.getAllStudents().subscribe(data => {
      this.SumStudent = data.length;
    });

    this.subscription = this.teacherService.getAllLecturers().subscribe(data => {
      this.SumTeacher = data.length;
    });

    this.subscription = this.employeeService.getAllEmployee().subscribe(data => {
      this.SumEmployee = data.length;
    });

    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.SumSemeater = data.length;
    });

    this.subscription = this.classService.getAllClazz().subscribe(data => {
      this.SumClass = data.length;
    });


    this.subscription = this.evaluesService.getavgEvaluetesLec().subscribe(data => {
     this.avgEvaluetesLec=data;
    });

    this.primaryXAxisyear = {
      valueType: 'Category'
    };

    this.primaryXAxismajor = {
      valueType: 'Category'
    };


  }

  change(){
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookie.deleteAll();
    window.location.reload();
  }

}



