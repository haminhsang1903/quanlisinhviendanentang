import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { SubjectService } from './../../../services/subject.service';
import { Subjects } from './../../../models/subjects.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.css']
})
export class ManageSubjectComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public subjects: Subjects[] = [];
  public subject: Subjects;
  key: string;
  p: number = 1;
  name: string;
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
  messId: string;
  messName: string;
  messSeesion: string;
  messCredit: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachmonhoc.xlsx');
  }

  constructor(public subjectService: SubjectService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
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

    this.subscription = this.subjectService.getAllSubject().subscribe((data: Subjects[]) => {
      this.subjects = data;
    });

    this.subject = new Subjects();

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.subjectService.getSearch(this.key).subscribe(data => {
      this.subjects=data;
      console.log(data);
    })  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  Search() {
    if (this.name != "") {
      this.subjects = this.subjects.filter(res => {
        return res.id_subjects.trim().toLowerCase().match(this.name.trim().toLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }


  onAddSubjects() {
    var reg = /^[A-Z]{3}[0-9]{3}$/g;

    if(this.subject.id_subjects == null){
      this.messId = "Vui lòng nhập mã m6n học!"
    }
    else if(this.subject.name == null){
      this.messName = "Vui lòng nhập tên môn học!"
    }
    else if(this.subject.credit == null){
      this.messCredit = "Vui lòng nhập số tính chỉ!"
    }
    else if(this.subject.session == null){
      this.messSeesion = "Vui lòng nhập số buổi!"
    }
    else if(!reg.test(this.subject.id_subjects)){
      this.messErrors = "Mã môn học sai định dạng! Ví dụ: 'COM101'";
    }
    else if (this.subject.id_subjects != '' && this.subject.name != '' 
    && this.subject.session != null && this.subject.credit != null) {
      this.subscription = this.subjectService.addSubject(this.subject).subscribe((data: Subjects) => {
        this.routerService.navigateByUrl('admin/manage-subject');
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      },(error) => {
        this.messErrors = "Trùng mã môn học! Vui lòng nhập lại!";
      });
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateSubjects(){
    if(this.subject.id_subjects == ''){
      this.messId = "Vui lòng nhập mã m6n học!"
    }
    else if(this.subject.name == ''){
      this.messName = "Vui lòng nhập tên môn học!"
    }
    else if(this.subject.credit == null){
      this.messCredit = "Vui lòng nhập số tính chỉ!"
    }
    else if(this.subject.session == null){
      this.messSeesion = "Vui lòng nhập số buổi!"
    }
    else if (this.subject.name != '' && this.subject.session != null && this.subject.credit != null) {
    this.subscription = this.subjectService.updateSubject(this.subject).subscribe((data: Subjects) => {
      this.subject=data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
     // console.log(this.lecturer);
    });
  }else{
     this.messErrors1 = "Cập nhật thất bại!";
  }
  }


  onEditloadSubject(subject: Subjects) {
    this.subject = subject;
  }

  id_subjectss: string;
  onDeleteSubject(id_subjects: string) {
    this.id_subjectss=id_subjects;
  }

  onDeleteSubjects(id_subjects: string) {
    this.subscription = this.subjectService.deleteSubject(this.id_subjectss).subscribe((data: Subjects) => {
      this.updataDataAfterDelete(id_subjects);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  updataDataAfterDelete(id_subjects: string) {
    for (var i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].id_subjects == id_subjects) {
        this.subjects.splice(i, 1);
        break;
      }
    }
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
