import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticalService } from './../../../services/statistical.service';
import { StudentByYear } from './../../../models/studentByYear.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
declare var $$: any;

@Component({
  selector: 'app-student-by-year',
  templateUrl: './student-by-year.component.html',
  styleUrls: ['./student-by-year.component.css'],
      template:
    `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='month' yName='sales' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`

})
export class StudentByYearComponent implements OnInit {
  public studentByYear: StudentByYear[];
  public subscription: Subscription; 
  p: number = 1;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;
  public primaryXAxis: Object;

  constructor(public cookieService: CookieService, public routerService: Router,
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



    this.subscription = this.statisticalService.gettotalStudentByYear().subscribe(data => {
      this.studentByYear = data;
      console.log(data);
    });

        this.primaryXAxis = {
            valueType: 'Category'
        };

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
