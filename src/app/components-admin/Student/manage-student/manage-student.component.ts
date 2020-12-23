import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from './../../../services/students.service';
import { Students } from './../../../models/students.model';
import { MajorService } from './../../../services/major.service';
import { Major } from './../../../models/major.model';
import { NominalClassService } from './../../../services/nominal-class.service';
import { NominalClass } from './../../../models/nomialclass.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';
import { registerLocaleData } from '@angular/common';
import { Address } from './../../../models/address.model';
import { Districts } from './../../../models/districts.model';
import { Wards } from './../../../models/wards.model';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput;
  public address: Address[];
  public districts: Districts[];
  public wards: Wards[];
  public provence: string;
  public district: string;
  public ward: string;
  public diachi: string;
  public student: Students;
  public major: string;
  public nominalClass: string;
  public students: Array<Students> = [];
  public majors: Major[] = [];
  public nominalClasses: NominalClass[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
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
  message: string;
  messagePhone: string;
  messageCMND: string;
  id: string;
  messName: string;
  messBirthday: string;
  messNominal: string;
  messMajor: string;
  messGender: string;
  messPhone: string;
  messCMND: string;
  messAdmistion: string;
  messAddress1: string;
  messAddress2: string;
  messAddress3: string;
  messAddress4: string;
  messDelete: string;

  myFiles:string [] = [];
  sMsg:string = '';

  url;
  msg = "";
  key: string;

  constructor(
    public routerService: Router,
    public studentService: StudentsService,
    public majorService: MajorService,
    public nominalClassService: NominalClassService,
    public activatedRoute: ActivatedRoute,
    public api: StudentsService,
    public cookieService: CookieService,
    private httpService: HttpClient
  ) { }

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachsinhvien.xlsx');
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

    // format

    // clear form
    $(document).ready(function () {
      $('#mod_cls').on('click', function () {
        $('#Q_A').trigger("reset");
        // console.log($('#Q_A'));
      })
    });

    this.student = new Students();
    this.subscription = this.majorService.getAllMajor().subscribe(data => {
      this.majors = data;
    })
    this.subscription = this.nominalClassService.getAllNominalClass().subscribe(data => {
      this.nominalClasses = data;
    })
    this.subscription = this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
      // console.log(data);
      this.totalRecords = data.length;
    })
    this.subscription = this.studentService.getAddress().subscribe(data => {
      this.address = data;
    })
   }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.studentService.getSearch(this.key).subscribe(data => {
      this.students=data;
      console.log(data);
    })  
  }

  onChangeDistricts(value){
    this.subscription = this.studentService.getDistricts(value).subscribe(data => {
      this.districts = data;
    })
  }

  onChangeWard(value){
    this.subscription = this.studentService.getWard(this.provence,value).subscribe(data => {
      this.wards = data;
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
      this.students = this.students.filter(res => {
        return res.id_students.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }


  onChangeNominal(valueCate) {
    this.api.getEditNominal(valueCate).subscribe(res => {
      //console.log(res);
      this.student.id_nominalclass = res;
    });
    //console.log(valueCate); 
    // console.log(this.student.id_nominalclass);
  }

  onChangeMajor(valueCate) {
    this.api.getEditMajor(valueCate).subscribe(res => {
      //console.log(res);
      this.student.id_major = res;
    });
    //console.log(valueCate);
    //console.log(this.student.id_major);
  }

  updateStudent() {
    this.student.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
        
    /*if(this.student.address !='' && this.ward != '' && this.district !='' && this.provence != ''){*/

    if(this.student.name == null){
      this.messName = "Vui lòng nhập họ và tên!"
    }
    else if(this.student.id_nominalclass == null){
      this.messNominal = "Vui lòng chọn lớp học!"
    }
    else if(this.student.id_major == null){
      this.messMajor = "Vui lòng chọn ngành học!"
    }
    else if(this.student.birthday == null){
      this.messBirthday = "Vui lòng chọn ngày sinh!"
    }
    else if(this.student.gender == null){
      this.messGender = "Vui lòng chọn giới tính!"
    }
    else if(this.student.phone == ''){
      this.messPhone = "Vui lòng nhập số điện thoại!"
    }
    else if(reg.test(this.student.phone)){
      this.messErrors = "Số diện thoại phải nhập là số";
    }
    else if (this.student.phone.substring(0, 1) != "0") {
      this.messErrors = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.student.phone.length != 10) {
      this.messErrors = "Số điện thoại phải đủ 10 số";
    }
    else if(this.student.admissions == null){
      this.messAdmistion = "Vui lòng nhập ngày nhập học!"
    }
    else if(this.student.identity_card == ''){
      this.messCMND = "Vui lòng nhập số CMND!"
    }
    else if(this.student.identity_card.length != 9 && this.student.identity_card.length != 12){
      this.messErrors = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.provence == null){
      this.messAddress1 = "Vui lòng nhập tỉnh!"
    }
    else if(this.district == null){
      this.messAddress2 = "Vui lòng nhập quận (huyện)!"
    }
    else if(this.ward== null){
      this.messAddress3 = "Vui lòng nhập xã (phường)!"
    }
    else if(this.diachi == ''){
      this.messAddress4 = "Vui lòng nhập ấp, số nhà, đường!"
    }
    else if(this.student.phone != '' && this.student.admissions != null
      && this.student.address != '' && this.student.identity_card != '' && this.student.name != '') {
      this.subscription = this.studentService.updateStudents(this.student).subscribe((data: Students) => {
        this.student = data;
        this.messErrors1 = '';
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
        // console.log(data);
      });
    } else {
      this.messErrors1 = "Cập nhật thất bại!";
    }
  }

  onAddStudent() {
    this.student.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
        
    /*if(this.student.address !='' && this.ward != '' && this.district !='' && this.provence != ''){*/

    if(this.student.name == null){
      this.messName = "Vui lòng nhập họ và tên!"
    }
    else if(this.student.id_nominalclass == null){
      this.messNominal = "Vui lòng chọn lớp học!"
    }
    else if(this.student.id_major == null){
      this.messMajor = "Vui lòng chọn ngành học!"
    }
    else if(this.student.birthday == null){
      this.messBirthday = "Vui lòng chọn ngày sinh!"
    }
    else if(this.student.gender == null){
      this.messGender = "Vui lòng chọn giới tính!"
    }
    else if(this.student.phone == null){
      this.messPhone = "Vui lòng nhập số điện thoại!"
    }
    else if(reg.test(this.student.phone)){
      this.messErrors = "Số diện thoại phải nhập là số";
    }
    else if (this.student.phone.substring(0, 1) != "0") {
      this.messErrors = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.student.phone.length != 10) {
      this.messErrors = "Số điện thoại phải đủ 10 số";
    }
    else if(this.student.admissions == null){
      this.messAdmistion = "Vui lòng nhập ngày nhập học!"
    }
    else if(this.student.identity_card == null){
      this.messCMND = "Vui lòng nhập số CMND!"
    }
    else if(this.student.identity_card.length != 9 && this.student.identity_card.length != 12){
      this.messErrors = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.provence == null){
      this.messAddress1 = "Vui lòng nhập tỉnh!"
    }
    else if(this.district == null){
      this.messAddress2 = "Vui lòng nhập quận (huyện)!"
    }
    else if(this.ward== null){
      this.messAddress3 = "Vui lòng nhập xã (phường)!"
    }
    else if(this.diachi == null){
      this.messAddress4 = "Vui lòng nhập ấp, số nhà, đường!"
    }
    else if (this.student.id_nominalclass != null && this.student.id_major != null && this.student.gender != null
      && this.student.id_students != '' && this.student.phone != '' && this.student.admissions != null
      && this.student.address != '' && this.student.identity_card != '' && this.student.name != '') {
      this.subscription = this.studentService.addStudents(this.student).subscribe((data: Students) => {
        this.routerService.navigate(['admin/manage-student']);
        window.location.reload();
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
      }/*,(error) => {
        this.messErrors = "Trùng mã sinh viên! Vui lòng nhập lại";
      }*/);
    } else {
      this.messErrors = "Thêm mới thất bại!";
    }
   }

  id_studentss: string;
  onDeleteStudent(id_students: string) {
    this.id_studentss=id_students;
  }

  onDeleteStudents(id_students: string) {
    this.subscription = this.studentService.deleteStudents(this.id_studentss).subscribe(data => {
      this.upDataAfterDelete(id_students);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  upDataAfterDelete(id_students: string) {
    let result = 0;
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].id_students == id_students) {
        this.students.splice(i, 1);
        break;
      }
    }
  }

  onEditStudent(student: Students) {
    this.student = student;
    if (Array.isArray(student.id_nominalclass))
      this.nominalClass = student.id_nominalclass[0].id_nominalclass;
    if (Array.isArray(student.id_major))
      this.major = student.id_major[0].id_major;
    else
      this.nominalClass = student.id_nominalclass.id_nominalclass;
    this.major = student.id_major.id_major;
    var idx = 0;
    while(this.student.address.includes(",")){
      var i = 0;
      for(i; i < this.student.address.length; i++){
        if(this.student.address.charAt(i).includes(",")){
          if(idx == 0){
            this.diachi = this.student.address.substring(0,i).trim();
          }
          if(idx == 1){
            this.ward = this.student.address.substring(0,i).trim();
          }
          if(idx == 2){
            this.district = this.student.address.substring(0,i).trim();
          }
          this.student.address = this.student.address.substring(i+1,this.student.address.length);
          idx += 1;
          break;
        }
      }
      if(this.student.address.includes(",") == false){
        this.provence = this.student.address.trim();
      }   
    }
    this.subscription = this.studentService.getDistricts(this.provence).subscribe(data => {
      this.districts = data;
    })
    this.subscription = this.studentService.getWard(this.provence,this.district).subscribe(data => {
      this.wards = data;
    })
  }

  change() {
    localStorage.removeItem('admin');
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])

    this.studentService.getUploadStudent(formData).subscribe(result => {
      this.message = result.toString();
      console.log(this.message = result.toString());
      console.log(result);
      this.messSuccess = "Nhập thành công!";
      window.location.reload();

    },
        (error) => {
          this.messErrors = "Nhập thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  uploadImgFile() {
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])

    this.studentService.getUploadImgStudent(formData).subscribe(result => {
      this.message = result.toString();
      console.log(this.message = result.toString());
      console.log(result);
      this.messSuccess = "Nhập thành công!";
      window.location.reload();
    },
        (error) => {
          this.messErrors = "Nhập file thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  
  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

    uploadFiles () {
    const frmData = new FormData();
    const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("file", this.myFiles[i]);
    }
      this.httpService.post('https://serverrunordie.herokuapp.com/cloud/uploads', frmData, {headers}).subscribe(
      data => {
        this.sMsg = data as string;
        console.log (this.sMsg);
         this.messSuccess = "Nhập thành công!";
      },
      /*(err: HttpErrorResponse) => {
        console.log (err.message);  
      }*/
    );
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
