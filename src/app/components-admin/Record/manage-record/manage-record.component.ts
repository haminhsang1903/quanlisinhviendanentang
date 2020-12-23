import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import * as jquery from 'jquery';
import { StudentsService } from './../../../services/students.service';
import { SemesterService } from './../../../services/semester.service';
import { RecordService } from './../../../services/record.service';
import { Students } from './../../../models/students.model';
import { Semester } from './../../../models/semester.model'; 
import { Record } from './../../../models/record.model'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-record',
  templateUrl: './manage-record.component.html',
  styleUrls: ['./manage-record.component.css']
})
export class ManageRecordComponent implements OnInit {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public students: Students[];
  public student: Students;
  public semesters: Semester[];
  public semester: Semester;
  public records: Record[];
  public record: Record;
  public recordd: number;
  public semesterr: string;
  public studentt: string;
  key: string;
  name:string;
  search;
  firstname: string;
  p: number = 1;
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
  messDate: string;
  messContent: string;
  messTyle: string;
  messSemester: string;
  messDelete: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachthanhtic/kyluat.xlsx');
  }

  constructor(public studentService: StudentsService,
    public semesterService: SemesterService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    private recordService: RecordService,
    public cookieService: CookieService) { }

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

    var dropdown = document.getElementsByClassName('dropdown-btn');
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
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

    this.record = new Record();
    this.student = new Students();
    this.semester = new Semester();

    this.subscription = this.recordService.getAllRecord().subscribe((data: Record[]) => {
        this.records = data;
    });

    this.subscription = this.recordService.getAllStudent().subscribe((data: Students[]) => {
        this.students = data;
    });

    this.subscription = this.recordService.getAllSemester().subscribe((data: Semester[]) => {
        this.semesters = data;
    });

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.recordService.getSearch(this.key).subscribe(data => {
      this.records=data;
      console.log(data);
    })  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onChangeStudent(valuestudent){
    this.recordService.getOneStudent(valuestudent).subscribe(res => {
      this.record.id_students = res;
    });
  }

  onChangeSemester(valuesemester){
    this.recordService.getOneSemester(valuesemester).subscribe(res => {
      this.record.id_semester = res;
    });
  }

  onAddRecord() {
    if(this.record.id_students == null){
      this.messId = "Vui lòng nhập mã sinh viên!"
    }
    else if(this.record.date == null){
      this.messDate = "Vui lòng chọn ngày ghi nhận!"
    }
    else if(this.record.tyle == null){
      this.messTyle = "Vui lòng chọn phân thành tích/Kỹ luật!"
    }
    else if(this.record.id_semester == null){
      this.messSemester = "Vui lòng chọn học kỳ!"
    }
    else if(this.record.content == null){
      this.messContent = "Vui lòng nhập nội dung!"
    }
    else if(this.record.tyle != null && this.record.content != '' && this.record.id_semester !=null && this.record.id_students != null){
    this.subscription = this.recordService.addRecord(this.record).subscribe((data: Record) => {
      this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      });
    }else{
       this.messErrors = "Thêm mới thất bại!";
    }
  }

  id_records: number;
  onDeleteRecord(id_record: number){
    this.id_records=id_record;
  }

  onDeleteRecords(id_record: number){
    this.subscription = this.recordService.deleteRecord(this.id_records).subscribe((data: Record) => {
        this.updataDataAfterDelete(id_record);
        window.location.reload();
      },
      (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
      );
  }

  updataDataAfterDelete(id_record: number) {
    for (var i = 0; i < this.records.length; i++) {
      if (this.records[i].id_record === id_record) {
        this.records.splice(i, 1);
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

}
