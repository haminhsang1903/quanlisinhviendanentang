import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { CourseService } from './../../../services/course.service';
import { Course } from './../../../models/course.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit, OnDestroy {

  public course: Course;
  public courses: Course[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  key: string;
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;
  message: string;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messNullId: string;
  messNullName: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachkhoahoc.xlsx');
  }

  constructor(
    public routerService: Router,
    public courseService: CourseService,
    public activatedRoute: ActivatedRoute,
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

    this.course = new Course();
    this.subscription = this.courseService.getAllCourse().subscribe(data => {
      this.courses = data;
      this.totalRecords = data.length;
    })
    this.course = new Course();
    // this.loadData();
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.courseService.getSearch(this.key).subscribe(data => {
      this.courses=data;
      console.log(data);
    })  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  Search(){
    if(this.name != ""){
    this.courses=this.courses.filter(res =>{
      return res.id_course.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
    })
    }else if (this.name == ""){
     this.ngOnInit();
    }
  }
  
  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddCourse(): void {
    var reg = /^K[0-9]{2}.[0-9]{1}$/g;
    
    if(this.course.id_course == null){
       this.messNullId = "Vui lòng nhập mã khóa học!";
    }
    else if(this.course.name == null){
       this.messNullName = "Vui lòng nhập tên khóa học!"
    }
    else if(!reg.test(this.course.id_course)){
      this.messErrors = "Mã khóa học sai định dạng! Ví dụ: 'K14.3'";
    }
    else if (this.course.id_course != '' && this.course.name != ''){
        this.subscription = this.courseService.addCourse(this.course).subscribe((data: Course) => {
          this.routerService.navigate(['admin/manage-course']);
          this.messErrors = '';
          this.messSuccess = "Thêm mới thành công!";
          window.location.reload();
        },(error) => {
          this.messErrors = "Trùng mã khóa học! Vui lòng nhập lại!";
        })
    }
    else{
         this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateCourse(){
    if(this.course.name == ''){
       this.messNullName = "Vui lòng nhập tên khóa học!"
    }
    else if(this.course.name != ''){
    this.subscription = this.courseService.updateCourse(this.course).subscribe((data: Course) => {
      this.course=data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
    });
    }else{
      this.messErrors1 = "Cập nhật thất bại!";
    }
  }
  
  id_courses: string;
  onDeleteCourse(id_course: string) {
    this.id_courses=id_course;
  }

  onDeleteCourses(id_course: string) {
    this.subscription = this.courseService.deleteCourse(this.id_courses).subscribe(data => {
        this.upDataAfterDelete(id_course);
        window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  upDataAfterDelete(id_course: string) {
    let result = 0;
    for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].id_course == id_course) {
            this.courses.splice(i, 1);
            break;
        }
    }
  }

  onEditCourse(course: Course){
    this.course = course;
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
