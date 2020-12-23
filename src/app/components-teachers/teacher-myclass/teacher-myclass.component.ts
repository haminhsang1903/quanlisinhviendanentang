import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import { AttendsService } from './../../services/attends.service';
import { Attends } from './../../models/attends.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Class } from './../../models/class.model';
import { Students } from 'src/app/models/students.model';
import { CLazzStudentResult } from 'src/app/models/ClazzStudentResult.model'; 
import { TeacherMyclassService } from 'src/app/services/teacher-myclass.service';
import { ClassService } from './../../services/class.service';
import { StudentsService } from 'src/app/services/students.service';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx'; 
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-teacher-myclass', 
  templateUrl: './teacher-myclass.component.html',
  styleUrls: ['./teacher-myclass.component.css']
})
export class TeacherMyclassComponent implements OnInit {

  public attends: Attends[];
  public attend: Attends;
  public clazzs: Class[];
  public clazzss: Class;
  public clazzsResult: Class[];
  public clazzStudent: string;
  public clazzResult: string;
  public students: Students[];
  public student: Students;
  public results: CLazzStudentResult[];
  public subscription: Subscription;

  public welcomename: string;

  public pagesize= 10;
  public pagesize1= 10;
  public pagesize2= 10;
  order: string;
  reverse: boolean = true;
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  public countSession: number;

  constructor(public teachermyclass: TeacherMyclassService,
    public classService: ClassService,
    public CookieService: CookieService,
    public routerService: Router
    ) { }
  
  /// xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Danhsachlop.xlsx');  
  }

  @ViewChild('TABLE1', { static: false }) TABLE1: ElementRef;
  ExportTOExcel1() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE1.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Danhsachdiemdanh.xlsx');  
  }

  @ViewChild('TABLE2', { static: false }) TABLE2: ElementRef;
  ExportTOExcel2() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE2.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Bangdiem.xlsx');  
  }



  ngOnInit(): void {

    this.welcomename=this.CookieService.get("usernamelecturers");

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

    $("#btnExport").click(function (e) {
    window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
    e.preventDefault();
    });

    this.subscription = this.teachermyclass.getClazzByLecture().subscribe(data => {
      this.clazzs = data;
      this.clazzStudent=this.clazzs[0].id_class;
      this.subscription = this.teachermyclass.getStudentByClazz(this.clazzStudent).subscribe(data => {
        this.students = data;
      });
    });

    this.subscription = this.teachermyclass.getClazzByLecture().subscribe(data => {
      this.clazzs = data;
      console.log(this.clazzs)
      this.clazzResult=this.clazzs[0].id_class;
      //this.countSession=this.clazzs[0].id_subjects.session;
      this.subscription = this.teachermyclass.getAllResultStudent(this.clazzResult).subscribe(data => {
        this.results = data;
        
      });

      this.subscription = this.teachermyclass.getOneClass(this.clazzResult).subscribe(data => {
        this.clazzss = data;
        this.countSession=this.clazzss.id_subjects.session;
      });

    });

    

  }

  counter(i: number){
    return new Array(i);
  }

  onChangeClazz(value){
    this.subscription = this.teachermyclass.getStudentByClazz(value).subscribe(data => {
      this.students = data;
    });
  }
  onChangeClazzResult(value){
    this.subscription = this.teachermyclass.getAllResultStudent(value).subscribe(data => {
      this.results = data;
      console.log(value);
    });

    this.subscription = this.teachermyclass.getOneClass(value).subscribe(data => {
        this.clazzss = data;
        this.countSession=this.clazzss.id_subjects.session;
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
