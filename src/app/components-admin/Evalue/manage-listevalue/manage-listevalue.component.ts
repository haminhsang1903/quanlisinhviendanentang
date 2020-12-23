import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

import { EvaluesService } from './../../../services/evalues.service';
import { EvaluetesSer } from './../../../models/evaluetesser.model';
import { Evaluetes } from './../../../models/evaluetes.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-listevalue',
  templateUrl: './manage-listevalue.component.html',
  styleUrls: ['./manage-listevalue.component.css']
})
export class ManageListevalueComponent implements OnInit {
  
  public evalues: Evaluetes[];
  id_class: string;
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;


  public subscription: Subscription;
  public subscriptionParams: Subscription;

  constructor(public routerService: Router,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService,
    public evalueservice: EvaluesService) { }

    ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachdanhgia.xlsx');
  }

  ngOnInit(): void {
  	this.id_class=this.cookieService.get('id_class');
  	this.welcome = this.cookieService.get('username');
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

    this.subscription=this.evalueservice.getEvalueFindByClazz(this.id_class).subscribe((data : Evaluetes[]) =>{
      this.evalues =data;
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
