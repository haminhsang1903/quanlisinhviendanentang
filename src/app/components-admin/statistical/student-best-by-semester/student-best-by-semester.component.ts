import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticalService } from './../../../services/statistical.service';
import { StudentGreat } from './../../../models/studentGreat.model';
import { SemesterService } from './../../../services/semester.service';
import { Semester } from './../../../models/semester.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-best-by-semester',
  templateUrl: './student-best-by-semester.component.html',
  styleUrls: ['./student-best-by-semester.component.css']
})
export class StudentBestBySemesterComponent implements OnInit {
  public studentGreat: StudentGreat[];
  public semester: Semester[];
  public id_semester: string;
  public subscription: Subscription; 
  p: number = 1;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;
  constructor(public cookieService: CookieService,
    public routerService: Router,
    public statisticalService: StatisticalService,
    public semesterService: SemesterService) { }

    //xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachsinhvien/nam.xlsx');
  }

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

    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.semester = data;
      console.log(data);
    });

    this.subscription = this.statisticalService.getStudentGreatBySemester(this.id_semester).subscribe(data => {
      this.studentGreat = data;
      console.log(data);
    });

  }

  onChangeSemester(value){
    this.subscription = this.statisticalService.getStudentGreatBySemester(value).subscribe(data => {
      this.studentGreat = data;
      console.log(data);
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
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
