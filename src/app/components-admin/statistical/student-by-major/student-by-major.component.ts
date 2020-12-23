import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticalService } from './../../../services/statistical.service';
import { StudentByYearAndMajor } from './../../../models/studentByYearAndMajor.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-by-major',
  templateUrl: './student-by-major.component.html',
  styleUrls: ['./student-by-major.component.css']
})
export class StudentByMajorComponent implements OnInit {
  public studentByYearAndMajor: StudentByYearAndMajor[];
  public subscription: Subscription; 
  p: number = 1;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;
  public primaryXAxis: Object;

  constructor(public cookieService: CookieService, 
    public routerService: Router,
    public statisticalService: StatisticalService) { }

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

    this.primaryXAxis = {
            valueType: 'Category'
    };

    this.subscription = this.statisticalService.gettotalStudentByYearAndMajor().subscribe(data => {
      this.studentByYearAndMajor = data;
      console.log(data);
    });
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
