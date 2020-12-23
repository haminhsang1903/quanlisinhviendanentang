import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { ClassService } from './../../../services/class.service';
import { SemesterService } from './../../../services/semester.service';
import { SubjectService } from './../../../services/subject.service';
import { Subjects } from './../../../models/subjects.model';
import { NominalClassService } from './../../../services/nominal-class.service';
import { NominalClass } from './../../../models/nomialClass.model';
import { Semester } from './../../../models/semester.model';
import { Class } from './../../../models/class.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public subjects: Subjects[];
  public subject: string;
  public semesters: Semester[];
  public semester: string;
  public nominals : NominalClass[];
  public nominal: string;
  public id_class: string;
  public clazzs: Class[] = [];
  public clazz: Class;
  key: string;
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
  messNullClassNominal: string;
  messNullSubject: string;
  messNullSemester: string;
  messNullName: string;
  messDelete: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachlophoc.xlsx');
  }

  constructor(public subjectService: SubjectService,
    public semesterservice: SemesterService,
    public clazzservice: ClassService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    public api: ClassService,
    public cookieService: CookieService,
    public mominalService: NominalClassService) { }

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
      })
    });

    this.clazz = new Class();

    //load combobox subjects form
    this.subscription = this.subjectService.getAllSubject().subscribe((data: Subjects[]) => {
      this.subjects = data;
    });

    //load combobox semester form
    this.subscription = this.semesterservice.getAllSemester().subscribe((data: Semester[]) => {
      this.semesters = data;
    });

    //load data form table class
    this.subscription = this.clazzservice.getAllClazz().subscribe((data: Class[]) => {
      this.clazzs = data;
    });

    //load data form table nominalsclass
    this.subscription = this.mominalService.getAllNominalClass().subscribe((data: NominalClass[]) => {
      this.nominals = data;
    });

    

    
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
    this.subscription = this.clazzservice.getSearch(this.key).subscribe(data => {
      this.clazzs=data;
    })  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }


  onChangeSemester(valueCate) {
    this.api.getEditSemester(valueCate).subscribe(res => {
      this.clazz.id_semester = res;
    });
  }

  onChangeSubject(valueCate) {
    this.api.getEditSubject(valueCate).subscribe(res => {
      this.clazz.id_subjects = res;
    });
  }

  onAddClazzs() {
    if(this.nominal == undefined){
      this.messNullClassNominal="Vui lòng chọn lớp học!"
    }
    else if(this.clazz.id_subjects == null){
      this.messNullSubject="Vui lòng chọn môn học!"
    }
    else if(this.clazz.id_semester == null){
      this.messNullSemester="Vui lòng chọn học kỳ!"
    }
    else if (this.clazz.id_subjects != null && this.clazz.name != '' && this.clazz.id_semester != null
      && this.clazz.id_class != '') {
      this.clazz.id_class=this.nominal +'-'+ this.subject
      this.clazz.name= this.nominal +' - '+ this.clazz.id_subjects.name
      this.subscription = this.clazzservice.addClazz(this.clazz).subscribe((data: Class) => {
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      }, (error) => {
        this.messErrors = "Trùng mã lớp học! Vui lòng nhập lại";
      });
    } else {
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateClass() {
    if(this.clazz.name == ''){
      this.messNullName = "Vui lọng nhập tên lớp!"
    }
    else if (this.clazz.name != '') {
      this.subscription = this.clazzservice.updateClass(this.clazz).subscribe((data: Class) => {
        this.clazz = data;
        this.messErrors1 = '';
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
      });
    } else {
      this.messErrors1 = "Cập nhật thất bại!";
    }

  }

  id_classs: string;
  onDeleteClazzs(id_class: string) {
    this.id_classs=id_class;
  }

  onDeleteClazzss(id_class: string) {
    this.subscription = this.clazzservice.deleteClazz(this.id_classs).subscribe((data: Class) => {
      this.updataDataAfterDelete(id_class);
      window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  updataDataAfterDelete(id_class: string) {
    for (var i = 0; i < this.clazzs.length; i++) {
      if (this.clazzs[i].id_class == id_class) {
        this.clazzs.splice(i, 1);
        break;
      }
    }
  }

  onEditloadClass(clazz: Class) {
    this.clazz = clazz;
    if (Array.isArray(clazz.id_semester))
      this.semester = clazz.id_semester[0].id_semester;
    if (Array.isArray(clazz.id_subjects))
      this.subject = clazz.id_subjects[0].id_subjects;
    else
      this.semester = clazz.id_semester.id_semester;
    this.subject = clazz.id_subjects.id_subjects
  }

  Search() {
    if (this.name != "") {
      this.clazzs = this.clazzs.filter(res => {
        return res.id_class.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  SendID_Clazz(id_clazz: string){
    this.cookieService.set('id_class', id_clazz);
  }

  change(){
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void {
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
