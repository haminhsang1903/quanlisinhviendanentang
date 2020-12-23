import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { RoomsService } from './../../../services/rooms.service';
import { SkoftesService } from './../../../services/skoftes.service';
import { ClassService } from './../../../services/class.service';
import { Rooms } from './../../../models/rooms.model';
import { Class } from './../../../models/class.model';
import { Skoftes } from './../../../models/skoftes.model';
import { RoomsEmpty } from './../../../models/roomempty.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-roomdatenow',
  templateUrl: './manage-roomdatenow.component.html',
  styleUrls: ['./manage-roomdatenow.component.css']
})
export class ManageRoomdatenowComponent implements OnInit {

  public roomsEmpty: RoomsEmpty;
  public roomsEmptys: RoomsEmpty[];
  public clazz: Class;
  public clazzs: Class[];
  public skoftes: Skoftes;
  public skoftess: Skoftes[];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;
  date1:string;
  date2:string;
  date3:string;

  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachphonghoc.xlsx');
  }

  constructor(public routerService: Router,
    public roomsService: RoomsService,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService,
    public clazzservice: ClassService,
    public skoftesService: SkoftesService) { }

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

   // validation form
    (function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();

    this.roomsEmpty = new RoomsEmpty();

/*    this.subscription = this.clazzservice.getAllClazz().subscribe(data => {
     this.clazzs=data;
      console.log(data);
    })*/

    this.subscription = this.skoftesService.getAllSkoftes().subscribe(data => {
     this.skoftess=data;
      console.log(data);
    })

/*    this.subscription = this.roomsService.getRoomsdate("2020-11-17").subscribe(data => {
      this.roomsEmptys=data;
      console.log(data);
    })*/
  }

  onClickDate(){
    //console.log(this.date1);
    this.subscription = this.roomsService.getRoomsdate(this.date1).subscribe(data => {
      this.roomsEmptys=data;
      console.log(data);
    })
  
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
