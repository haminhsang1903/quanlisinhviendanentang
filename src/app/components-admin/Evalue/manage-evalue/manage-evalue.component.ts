import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { ClassService } from './../../../services/class.service';
import { EvaluesService } from './../../../services/evalues.service';
import { EvaluetesSer } from './../../../models/evaluetesser.model';
import { Evaluetes } from './../../../models/evaluetes.model';
import { TeacherService } from './../../../services/teacher.service';
import { Lecturers } from './../../../models/lecturers.model';
import { Class } from './../../../models/class.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-evalue',
  templateUrl: './manage-evalue.component.html',
  styleUrls: ['./manage-evalue.component.css']
})
export class ManageEvalueComponent implements OnInit {

  public evaluetesser: EvaluetesSer[];
  public evaluetes: Evaluetes[];
  public class: Class[];
  public lecturers: Lecturers[];
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;

  public id_lecturers: string = "null";
  public id_class: string;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  
  public subscription: Subscription;
  public subscriptionParams: Subscription;

  constructor(public routerService: Router,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService,
    public evalueservice: EvaluesService,
    public classService: ClassService,
    public teacherService: TeacherService) { }


  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachdanhgia.xlsx');
  }

  ngOnInit(): void {

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

    // validation form
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

    // clear form
    $(document).ready(function () {
      $('#mod_cls').on('click', function () {
        $('#Q_A').trigger("reset");
        console.log($('#Q_A'));
      })
    });

    this.subscription = this.classService.getAllClazz().subscribe(data => {
      this.class = data;
    })

    this.subscription = this.evalueservice.getAllEvalueTesSer(this.id_lecturers).subscribe(data => {
      console.log(data);
      this.evaluetesser = data;
    })

    this.subscription = this.evalueservice.getEvalueFindByClazz(this.id_class).subscribe(data => {
      console.log(data);
      this.evaluetes = data;
    })

    this.subscription = this.teacherService.getAllLecturers().subscribe(data => {
      console.log(data);
      this.lecturers = data;
    })
  }

  onChangeLecturers(value){
   this.subscription = this.evalueservice.getAllEvalueTesSer(value).subscribe(data => {
      console.log(data);
      this.evaluetesser = data;
    })
  }

  onChangeClazz(value){
   this.subscription = this.evalueservice.getEvalueFindByClazz(value).subscribe(data => {
      console.log(data);
      this.evaluetes = data;
    })
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  ViewEvalueLecturers(id_class: string){
    this.cookieService.set('id_class', id_class);
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
