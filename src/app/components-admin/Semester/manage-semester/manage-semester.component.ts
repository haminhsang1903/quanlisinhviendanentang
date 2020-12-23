import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { SemesterService } from './../../../services/semester.service';
import { Semester } from './../../../models/semester.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-semester',
  templateUrl: './manage-semester.component.html',
  styleUrls: ['./manage-semester.component.css']
})
export class ManageSemesterComponent implements OnInit, OnDestroy {

  public semester: Semester;
  public semesters: Semester[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  key: string;
  id_semester: string;
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messId: string;
  messName: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachhocky.xlsx');
  }

  constructor(
    public routerService: Router,
    public semesterService: SemesterService,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService
  ) { }

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

    this.semester = new Semester();
    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.semesters = data;
      this.totalRecords = data.length;
    })
    // this.loadData();
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.semesterService.getSearch(this.key).subscribe(data => {
      this.semesters=data;
      console.log(data);
    })  
  }

  Search() {
    if (this.name != "") {
      this.semesters = this.semesters.filter(res => {
        return res.id_semester.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddSemester(): void {
    var reg = /^FALL|SPRING|SUMMER[0-9]{4}$/g;
    var regex = /((FALL)|(SUMMER)|(SPRING))\d{4}/;
    if(this.semester.id_semester == null){
      this.messId = "Vui lòng nhập mã học kỳ!";
    }
    else if(this.semester.name == null){
      this.messName = "Vui lòng nhập tên học kỳ!";
    }
    else if(!regex.test(this.semester.id_semester)){
      this.messErrors = "Mã học kỳ sai định dạng! Ví dụ: 'SUMMER2020 hoặc FALL2020 hoặc SPRING2020'";
    }
    else if (this.semester.id_semester != '' && this.semester.name != '') {
      this.subscription = this.semesterService.addSemester(this.semester).subscribe((data: Semester) => {
        this.routerService.navigate(['admin/manage-semester']);
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      },(error) => {
        this.messErrors = "Trùng mã học kỳ! Vui lòng nhập lại";
      })
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateSemester() {
    if(this.semester.name == ''){
      this.messName = "Vui lòng nhập tên học kỳ!";
    }
    else if (this.semester.name != '') {
    this.subscription = this.semesterService.updateSemester(this.semester).subscribe((data: Semester) => {
      this.semester = data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
      // console.log(this.lecturer);
    });
  }else{
     this.messErrors1 = "Cập nhật thất bại!";
  }
  }

  id_semesters: string;
  onDeleteSemester(id_semester: string) {
    this.id_semesters=id_semester;
  }

  onDeleteSemesters(id_semester: string) {
    this.subscription = this.semesterService.deleteSemester(this.id_semesters).subscribe(data => {
      this.upDataAfterDelete(id_semester);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  upDataAfterDelete(id_semester: string) {
    let result = 0;
    for (var i = 0; i < this.semesters.length; i++) {
      if (this.semesters[i].id_semester == id_semester) {
        this.semesters.splice(i, 1);
        break;
      }
    }
  }

  onEditSemester(semester: Semester) {
    this.semester = semester;
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

