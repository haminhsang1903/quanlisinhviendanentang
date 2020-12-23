import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { CourseService } from './../../../services/course.service';
import { Course } from './../../../models/course.model';
import { NominalClassService } from './../../../services/nominal-class.service';
import { NominalClass } from './../../../models/nomialclass.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-nominalclass',
  templateUrl: './manage-nominalclass.component.html',
  styleUrls: ['./manage-nominalclass.component.css']
})
export class ManageNominalclassComponent implements OnInit, OnDestroy {

  public nominalClass: NominalClass;
  public course: string;
  public nominalClasses: NominalClass[] = [];
  public courses: Course[];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription; 
  key: string;
  p: number = 1;
  name:string;
  search;
  welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messID: string;
  messName: string;
  messCourse: string;
  messDelete: string;
  
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
    public courseService: CourseService,
    public nominalService: NominalClassService,
    public activatedRoute: ActivatedRoute,
    private api: NominalClassService,
    public cookieService: CookieService
  ) { }

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

    // clear form
    $(document).ready(function()
         {
        $('#mod_cls').on('click', function () {
      $('#Q_A').trigger("reset");
        console.log($('#Q_A'));
     })
    });

    this.nominalClass = new NominalClass();
    this.subscription = this.courseService.getAllCourse().subscribe(data => {
      this.courses = data;
    })
    this.subscription = this.nominalService.getAllNominalClass().subscribe(data => {
      this.nominalClasses = data;
      this.totalRecords = data.length;
    })
    this.nominalClass = new NominalClass();
    //this.course = new Course();
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.nominalService.getSearch(this.key).subscribe(data => {
      this.nominalClasses=data;
      console.log(data);
    })  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onChangeCourse(valueCate){
    this.api.getEditCourse(valueCate).subscribe(res =>{
      this.nominalClass.id_course=res;
      console.log(res);
    });
    console.log(this.nominalClass.id_course);


  }

  onAddNominalClass(): void {
    var reg = /^[A-Z]{2}[0-9]{5}$/g;

    if(this.nominalClass.id_nominalclass == null){
      this.messID = "Vui lòng nhập mã lớp học!"
    }
    else if(this.nominalClass.name == null){
      this.messName = "Vui lòng nhập tên lớp học!"
    }
    else if(this.nominalClass.id_course == null){
      this.messCourse = "Vui lòng chọn khóa học!"
    }
    else if(!reg.test(this.nominalClass.id_nominalclass)){
      this.messErrors = "Mã lớp học sai định dạng! Ví dụ: 'PM14301'";
    }
    else if(this.nominalClass.id_course != null && this.nominalClass.id_nominalclass != '' && this.nominalClass.name != ''){
      // Call API in POST Service and get data
    this.api.getEditCourse(this.course).subscribe(res => {
      // handle response});
      this.nominalClass.id_course = res;
    });
    this.subscription = this.nominalService.addNominalClass(this.nominalClass).subscribe((data: NominalClass) => {
      this.routerService.navigate(['admin/manage-nominalclass']);
      this.messErrors = '';
      this.messSuccess = "Thêm mới thành công!";
      window.location.reload();
    },(error) => {
      this.messErrors = "Trùng mã khóa học! Vui lòng nhập lại!";
    }) 
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateNominalClass(){
    if(this.nominalClass.name == ''){
      this.messName = "Vui lòng nhập tên lớp học!"
    }
    else if(this.nominalClass.id_course != null && this.nominalClass.name != ''){
    this.subscription = this.nominalService.updateNominalClass(this.nominalClass).subscribe((data: NominalClass) => {
      this.nominalClass=data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
    });
  }else{
    this.messErrors1 = "Cập nhật thất bại!";
  }
  }

  id_nominalclasss: string;
  onDeleteNominalClass(id_nominalclass: string) {
    this.id_nominalclasss=id_nominalclass;
  }

  onDeleteNominalClasss(id_nominalclass: string) {
    this.subscription = this.nominalService.deleteNominalClass(this.id_nominalclasss).subscribe(data => {
        this.upDataAfterDelete(id_nominalclass);
        window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  upDataAfterDelete(id_nominalclass: string) { 
    let result = 0;
    for (var i = 0; i < this.nominalClasses.length; i++) {
        if (this.nominalClasses[i].id_nominalclass == id_nominalclass) {
            this.nominalClasses.splice(i, 1);
            break;
        }
    }
  }

  onEditNominalClass(nominalClass: NominalClass){
    this.nominalClass = nominalClass;
    if( Array.isArray(nominalClass.id_course))
      this.course = nominalClass.id_course[0].id_course;
    else
      this.course = nominalClass.id_course.id_course;
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


  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}
