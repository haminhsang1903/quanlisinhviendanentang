import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import * as $ from 'jquery';   
import { StudentScoreService } from './../../services/student-score.service';
import { StatisticalService } from './../../services/statistical.service';
import { ResultService } from './../../services/result.service';
import { Results } from './../../models/results.model';
import { TotalSubject } from './../../models/totalsubject.model';
import { Students } from './../../models/students.model';
import { ResultStudent } from './../../models/resultstudent.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
 
@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.css']
})
export class StudentScoreComponent implements OnInit {

  public resultStudent: ResultStudent[];
  public totalSubjects: TotalSubject;
  public results: Results[];
  public subscription: Subscription; 
  public  welcomename: string;
  public avg;
  public totalSubject;
  public totalPass;
  public totalFail;

  constructor(public routerService: Router,
    public studentscoreService: StudentScoreService,
    public CookieService: CookieService,
    public resultservice: ResultService,
    public statisticalService: StatisticalService) { }

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Bangdiem.xlsx');  
  }

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

    this.subscription = this.studentscoreService.getStudentScore().subscribe(data => {
      this.resultStudent = data;
      //console.log(data);
    });

    this.subscription = this.statisticalService.gettotalSubject().subscribe(data => {
      this.totalSubjects = data;

      
      //console.log(this.totalSubject.length=1);

      console.log(data);
      console.log(this.totalSubject=data);
    });

    this.subscription = this.resultservice.getTotalAVG().subscribe(data => {
      this.results = data ;

      console.log(data);
      this.avg=data;
      console.log(this.avg=data);

    });

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
