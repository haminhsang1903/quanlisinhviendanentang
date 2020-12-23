import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import * as $ from 'jquery';  
import { StudentHistoryService } from './../../services/student-history.service';
import { Results } from './../../models/results.model';
import { Students } from './../../models/students.model';
import { ResultStudent } from './../../models/resultstudent.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css'] 
})
export class StudentHistoryComponent implements OnInit {

  public result: string; 
  public resultStudent: ResultStudent[];
  public results: Object[];
  public students: Students[]; 
  public subscription: Subscription;
  public  welcomename: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;

  p: number = 1;

  constructor(public routerService: Router,
    public studenthistoryService: StudentHistoryService,
    public CookieService: CookieService) { }

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Lichsuhoc.xlsx');  
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

    //   /// load data student history
    //   this.subscription = this.studenthistoryService.getResultHis().subscribe(data => {
    //   this.results = data; /*Object.keys(data).map(key => ({type: key, value: data[key] }))*/
    //   console.log(data); 
    //   console.log(this.results[0][0]);
    //   //this.semester=this.semesters[0].id_semester;

    //   // this.subscription = this.attendsService.getAllAttendsByStudent(this.semester).subscribe(data => {
    //   // this.attends = data;
    //   // console.log(this.attends);
    //   // })
    // });

      this.subscription = this.studenthistoryService.getHistoryStudent().subscribe(data => {
      this.resultStudent = data; /*Object.keys(data).map(key => ({type: key, value: data[key] }))*/
      console.log(data);
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
