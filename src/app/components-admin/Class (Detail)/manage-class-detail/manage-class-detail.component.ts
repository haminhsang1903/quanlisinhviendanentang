import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef  } from '@angular/core';
import * as $ from 'jquery';
import { ClassDetailService } from './../../../services/class-detail.service';
import { ClassService } from './../../../services/class.service';
import { NominalClassService } from './../../../services/nominal-class.service';
import { Class } from './../../../models/class.model';
import { Students } from './../../../models/students.model';
import { NominalClass } from './../../../models/nomialClass.model';
import { ClassDetail } from './../../../models/classDetail.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-manage-class-detail', 
  templateUrl: './manage-class-detail.component.html',
  styleUrls: ['./manage-class-detail.component.css']
})
export class ManageClassDetailComponent implements OnInit, OnDestroy {

  public subscription : Subscription;
  // public nomialClasses: NominalClass[];
  public clazzDetails: Array<ClassDetail> = [];
  public classDetail : ClassDetail[];
  public nominalClass : NominalClass[];
  public classDetaill : ClassDetail;
  public student: Students;
  public clazzss: Class;
  public clazzs: Class[];
  public clazzsz: Class[];
  public students: Array<Students> = [];
  public studentsClass: Students[];
  public clazzDetail:ClassDetail;
  public clazz: string;
  public nominal: string;
  public clazzzs: string;
  public id_nominalClazz: string;
  public id_Clazz: string;
  public id_Details: string;
  public messageSuccess: string;
  public messageErr: string;
  public messErrors: string;
  messDelete: string;

  name: string;
  search;
  public id_class: string;
  public id_clazz: string;
  public rbs: any;
  p: number = 1;
  p1: number = 1;
  totalRecords: number;
  page: number =1;
  welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;
  key: string;
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachlophoc.xlsx');
  }

  constructor(
    public routerService: Router,
    public activatedRouteService : ActivatedRoute,
    public clazzdetailservice : ClassDetailService,
    public classService: ClassService,
    public cookieService: CookieService,
    public nominalClassService: NominalClassService
  ) { }

  ngOnInit(): void {
    this.welcome = this.cookieService.get('username');
    this.id_clazz=this.cookieService.get('id_class');
    if(this.welcome == "admin"){
      this.show = true;
    }
    ///nav close
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
    //// validation form
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
    $(document).ready(function()
         {
        $('#mod_cls').on('click', function () {
      $('#Q_A').trigger("reset");
     })
    });

    this.clazzDetail = new ClassDetail();

    this.id_nominalClazz = this.cookieService.get('id_nominalclass');
    // this.nomialClass = new NominalClass(); 
    this.subscription=this.classService.getAllClazzAddStudent().subscribe((data : Class[]) =>{
      this.clazzs =data;
    });

    this.subscription=this.classService.getAllClazz().subscribe((data : Class[]) =>{
      this.clazzsz =data;
    });

    this.subscription=this.clazzdetailservice.getFindAllByClazz(this.id_Details).subscribe((data : ClassDetail[]) =>{
      this.clazzDetails =data;
    });

    this.subscription=this.nominalClassService.getAllNominalClass().subscribe((data : NominalClass[]) =>{
      this.nominalClass =data;
    });

    this.subscription=this.clazzdetailservice.getFindNotlnClassDeatail(this.id_clazz, this.id_nominalClazz).subscribe((data : Students[]) =>{
      this.studentsClass =data;
      /*this.totalRecords = data.length;*/
    });

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.clazzdetailservice.getSearch(this.key).subscribe(data => {
      this.clazzDetails=data;
    })  
  }

  onChangeid_nominalclass(valueNominal){
   this.subscription=this.clazzdetailservice.getFindNotlnClassDeatail(this.id_clazz, valueNominal).subscribe((data : Students[]) =>{
      this.studentsClass =data;
    });
  }

  onChangeClazzz(value_id_class){
    this.subscription=this.clazzdetailservice.getFindAllByClazz(value_id_class).subscribe((data : ClassDetail[]) =>{
      this.clazzDetails =data;
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  all: any;
  onClickAll() {
    var i = 0;
    var a;
    this.clazzDetails.length = 0;
    for (i = 0; i < this.studentsClass.length; i++) {
      this.all = document.querySelectorAll('input[name="clickAll"]');
      this.rbs = document.querySelectorAll('input[name="'+this.studentsClass[i].id_students+'"]');
      var selected = undefined;
      for(const al of this.all){
        if(al.checked){
          for (const rb of this.rbs) {
              rb.checked = true;
              if(rb.checked){
                selected = rb.value;
              }
              break;
          }
        }else{
          for (const rb of this.rbs) {
            rb.checked = false;
            if(rb.checked){
              selected = rb.value;
            }
            break;
        }
        }
      }
    }
  }

  onAddClazzDetail(){
    var i = 0;
    var a;
    this.clazzDetails.length = 0;
    for (i = 0; i < this.studentsClass.length; i++) {
      this.rbs = document.querySelectorAll('input[name="'+this.studentsClass[i].id_students+'"]');
      var selected = undefined;
      for (const rb of this.rbs) {
        if (rb.checked) {       
            selected = rb.value;
            let claD = new ClassDetail();
            let cla = new Class();
            let stu = new Students();
            cla.id_class = this.id_clazz;
            console.log(this.id_clazz)
            stu.id_students = this.studentsClass[i].id_students;
            claD.id_class = cla;
            claD.id_students = stu;
            this.clazzDetails.push(claD);
          break;
        }
      }
    }

    let cla = new Class();
    cla.id_class = this.id_clazz;
    if(this.id_clazz != null){
      this.subscription = this.clazzdetailservice.addClazzDetail(this.clazzDetails).subscribe((data: ClassDetail[]) =>{
      this.messageErr = '';
      this.messageSuccess = "Thêm mới thành công!";
      window.location.reload();
     },
        (error) => {
        this.messageErr = "Vui lòng thêm lịch trước khi thêm sinh viên vào lớp!";
      }
     );
    }else{
      this.messageErr = "Thêm mới thất bại!";
    }
    
  
  }

  id_Detailss: number;
  onDeleteClassDetail(id_Details: number) {
    this.id_Detailss=id_Details;
  }

  onDeleteClassDetails(id_Details: number) {
    this.subscription = this.clazzdetailservice.deleteClazzDetail(this.id_Detailss).subscribe((data: ClassDetail) => {
      this.updataDataAfterDelete(id_Details);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  updataDataAfterDelete(id_Details: number) {
    for (var i = 0; i < this.clazzDetails.length; i++) {
      if (this.clazzDetails[i].id_classdetail == id_Details) {
        this.clazzDetails.splice(i, 1);
        break;
      }
    }
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
      
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
      }
    }

}
