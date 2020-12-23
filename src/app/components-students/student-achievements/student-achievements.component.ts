import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from './../../services/record.service';
import { Record } from './../../models/record.model';
import * as $ from 'jquery'; 
import { Subscription } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-achievements',
  templateUrl: './student-achievements.component.html',
  styleUrls: ['./student-achievements.component.css']
})
export class StudentAchievementsComponent implements OnInit {

  public subscription: Subscription;
  public records: Record[];
  public record: Record;
  public  welcomename: string;
  p: number = 1;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'danhsachthanhtich/kyluat.xlsx');  
  }

  constructor(public CookieService: CookieService,
              public routerService: Router,
              public recordService: RecordService) { }

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

      this.subscription = this.recordService.getAllRecordStudent().subscribe(data => {
      this.records = data;
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
