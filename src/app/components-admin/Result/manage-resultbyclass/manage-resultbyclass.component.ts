import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AttendsService } from './../../../services/attends.service';
import { ManageResultService } from './../../../services/manage-result.service';
import { Attends } from './../../../models/attends.model';
import { Students } from './../../../models/students.model';
import { Subscription} from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { CookieService } from 'ngx-cookie-service';
import { CLazzStudentResult } from 'src/app/models/ClazzStudentResult.model';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-manage-resultbyclass',
  templateUrl: './manage-resultbyclass.component.html',
  styleUrls: ['./manage-resultbyclass.component.css']
})
export class ManageResultbyclassComponent implements OnInit {

  public subscription : Subscription;
  public subscriptionParams : Subscription; 
  public attend: Attends[]=[];
  public attends : Attends;
  public students: Students[]=[];
  public clazzs: Class[]=[];
  public clazzsResult: Class[];
  public clazzStudent: string;
  public clazzResult: string;
  public results: CLazzStudentResult[];
  public clazz: string;
  public student: string;
  //public clazz: string;
  name: string;
  search;
  p: number = 1;
  public welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;
  constructor(public attendsService : AttendsService, 
              public routerService: Router,
              public activatedRouteService : ActivatedRoute,
              private api: AttendsService,
              public manageResultService: ManageResultService,
              public cookieService: CookieService
              ) { }

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Danhsachbangdiemsinhvien.xlsx');  
  }

  ngOnInit(): void {
  	//script menu slider
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
      
     this.attends = new Attends();

     this.subscription=this.manageResultService.getAllClazz().subscribe((data : Class[]) =>{
        this.clazzs =data;

      this.subscription = this.attendsService.getAllResultStudent(this.clazzResult).subscribe(data => {
        this.results = data;
        console.log(this.results[0].attend)
      });
         
    });

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onChangeClazzResult(value){
    this.subscription = this.attendsService.getAllResultStudent(value).subscribe(data => {
      this.results = data;
      console.log(value);
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