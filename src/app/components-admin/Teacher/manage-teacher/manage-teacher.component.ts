import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';  
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
//import { HttpErrorResponse } from '@angular/common/http/src/response';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from './../../../services/teacher.service';
import { Lecturers } from './../../../models/lecturers.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';
import { Address } from './../../../models/address.model';
import { Districts } from './../../../models/districts.model';
import { Wards } from './../../../models/wards.model';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css']
})
export class ManageTeacherComponent implements OnInit, OnDestroy {
  public address: Address[];
  public districts: Districts[];
  public wards: Wards[];
  public provence: string;
  public district: string;
  public ward: string;
  public diachi: string;
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public lecturers: Lecturers[] = [];
  public lecturer: Lecturers;
  public id_lec: string;
  p: number = 1;
  name: string;
  welcome: string;
  public pagesize= 10;
  search;
  order: string;
  reverse: boolean = true;
  show;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messagePhone: string;
  messageCMND: string;
  messName: string;
  messBirthday: string;
  messGender: string;
  messAvt: string;
  messCMND: string;
  messCMND1: string;
  messPhone: string;
  messPhone1: string;
  messPhone2: string;
  messSpecialized: string;
  messStartdate: string;
  messAddress1: string;
  messAddress2: string;
  messAddress3: string;
  messAddress4: string;
  messStatus: string;
  messDelete: string;
  
  myFiles:string [] = [];
  sMsg:string = '';
  key: string;

  url;
  msg = "";


  constructor(public teacherService: TeacherService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    public cookieService: CookieService,
    private httpService: HttpClient) { }

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachgiangvien.xlsx');
  }

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

    // findAll Lecturers
    this.subscription = this.teacherService.getAllLecturers().subscribe((data: Lecturers[]) => {
      this.lecturers = data;
    });
    this.lecturer = new Lecturers();

    this.subscription = this.teacherService.getAddress().subscribe(data => {
      this.address = data;
    })
   }

   checkDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(this.lecturer.birthday, 'dd/MM/yyyy')
    console.log(dateSendingToServer);
  }

  onChangeDistricts(value){
    this.subscription = this.teacherService.getDistricts(value).subscribe(data => {
      this.districts = data;
    })
  }

  onChangeWard(value){
    this.subscription = this.teacherService.getWard(this.provence,value).subscribe(data => {
      this.wards = data;
    })
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  
  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.teacherService.getSearch(this.key).subscribe(data => {
      this.lecturers=data;
      console.log(data);
    })  
  }

  Search() {
    if (this.name != "") {
      this.lecturers = this.lecturers.filter(res => {
        return res.id_lecturers.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  onAddLecturers() {
    this.lecturer.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
    if(this.lecturer.address !='' && this.ward != '' && this.district !='' && this.provence != ''){
    if(this.lecturer.name == null){
      this.messName = "Vui lòng nhập họ và tên!"
    }
    else if(this.lecturer.birthday == null){
      this.messBirthday = "Vui lòng chọn ngày sinh!"
    }
    else if(this.lecturer.gender == null){
      this.messGender = "Vui lòng chọn giới tính!"
    }
    else if(this.url == null){
      this.messAvt = "Vui lòng chọn ảnh!"
    }
    else if(this.lecturer.identity_card == null){
      this.messCMND = "Vui lòng nhập số CMND"
    }
    else if(this.lecturer.identity_card.length != 9 && this.lecturer.identity_card.length != 12){
      this.messErrors = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.lecturer.phone == null){
      this.messPhone = "Vui lòng nhập số điện thoại"
    }
    else if(reg.test(this.lecturer.phone)){
      this.messErrors = "Số diện thoại phải nhập là số";
    }
    else if (this.lecturer.phone.substring(0, 1) != "0") {
      this.messErrors = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.lecturer.phone.length != 10) {
      this.messErrors = "Số điện thoại phải đủ 10 số";
    }
    else if(this.lecturer.startdate == null){
      this.messStartdate = "Vui lòng chọn ngày bắt đâu dạy!"
    }
    else if(this.lecturer.specialized == null){
      this.messSpecialized = "Vui lòng nhập chuyên môn!"
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
    else if(this.lecturer.status == null){
      this.messStatus = "Vui lòng chọn trạng thái!"
    }
    else if(this.lecturer.name != '' && this.lecturer.identity_card != '' && this.lecturer.specialized != null
      && this.lecturer.address != '' && this.lecturer.startdate != null && this.lecturer.phone != ''
      && this.lecturer.gender != null && this.lecturer.birthday != null && this.lecturer.avt !='' && this.lecturer.avt != '') {

      const frmData = new FormData();
      const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
      for (var i = 0; i < this.myFiles.length; i++) { 
        frmData.append("file", this.myFiles[i]);
      }
        
      this.subscription = this.teacherService.addLecturers(this.lecturer).subscribe((data: Lecturers) => {
        const frmData = new FormData();
        const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
        for (var i = 0; i < this.myFiles.length; i++) { 
          frmData.append("file", this.myFiles[i]);
        }
          this.subscription = this.teacherService.addPostavt(data.id_lecturers, frmData).subscribe((data: Lecturers) => {
          });
         this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        this.routerService.navigateByUrl('admin/manage-teacher');
        window.location.reload();
      });
    }else{
        this.messErrors = "Thêm mới thất bại!";
    }
   }
  }

  updateLecturers(){

    this.lecturer.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
    if(this.lecturer.address !='' && this.ward != '' && this.district !='' && this.provence != ''){

    if(this.lecturer.identity_card == ''){
      this.messCMND = "Vui lòng nhập số CMND"
    }
    else if(this.lecturer.identity_card.length != 9 && this.lecturer.identity_card.length != 12){
      this.messErrors1 = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.lecturer.phone == ''){
      this.messPhone = "Vui lòng nhập số điện thoại"
    }
    else if(reg.test(this.lecturer.phone)){
      this.messErrors1 = "Số diện thoại phải nhập là số";
    }
    else if (this.lecturer.phone.substring(0, 1) != "0") {
      this.messErrors1 = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.lecturer.phone.length != 10) {
      this.messErrors1 = "Số điện thoại phải đủ 10 số";
    }
    else if(this.lecturer.specialized == ''){
      this.messSpecialized = "Vui lòng nhập chuyên môn!"
    }
    else if(this.diachi == ''){
      this.messAddress4 = "Vui lòng nhập ấp, số nhà, đường!"
    }
    else if (this.lecturer.name != '' && this.lecturer.identity_card != '' && this.lecturer.specialized != ''
      && this.lecturer.address != '') {
    this.subscription = this.teacherService.updatelecturers(this.lecturer).subscribe((data: Lecturers) => {
      //this.lecturer=data;
      const frmData = new FormData();
      const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
      for (var i = 0; i < this.myFiles.length; i++) { 
        frmData.append("file", this.myFiles[i]);
      }
      this.myFiles[i]=this.lecturer.avt;
       this.subscription = this.teacherService.addPostavt(this.lecturer.id_lecturers, frmData).subscribe((data: Lecturers) => {
       });
       this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
     // console.log(this.lecturer);
    });
    }else{
      this.messErrors1 = "Cập nhật thất bại!";
    }
   }
  }


  onEditloadLecturers(lecturer: Lecturers) {
    this.lecturer = lecturer;
    var idx = 0;
    while(this.lecturer.address.includes(",")){
      var i = 0;
      for(i; i < this.lecturer.address.length; i++){
        if(this.lecturer.address.charAt(i).includes(",")){
          if(idx == 0){
            this.diachi = this.lecturer.address.substring(0,i).trim();
          }
          if(idx == 1){
            this.ward = this.lecturer.address.substring(0,i).trim();
          }
          if(idx == 2){
            this.district = this.lecturer.address.substring(0,i).trim();
          }
          this.lecturer.address = this.lecturer.address.substring(i+1,this.lecturer.address.length);
          idx += 1;
          break;
        }
      }
      if(this.lecturer.address.includes(",") == false){
        this.provence = this.lecturer.address.trim();
      }   
    }
    this.subscription = this.teacherService.getDistricts(this.provence).subscribe(data => {
      this.districts = data;
    })
    this.subscription = this.teacherService.getWard(this.provence,this.district).subscribe(data => {
      this.wards = data;
    })
  }

  id_lecturerss: string;
  onDeleteLecturers(id_lecturers: string) {
    this.id_lecturerss=id_lecturers;
  }

  onDeleteLecturerss(id_lecturers: string) {
    this.subscription = this.teacherService.deleteLecturers(this.id_lecturerss).subscribe((data: Lecturers) => {
      this.updataDataAfterDelete(id_lecturers);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  updataDataAfterDelete(id_lecturers: string) {
    for (var i = 0; i < this.lecturers.length; i++) {
      if (this.lecturers[i].id_lecturers == id_lecturers) {
        this.lecturers.splice(i, 1);
        break;

      }
    }
  }

  selectFile(event) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    
    var mimeType = event.target.files[0].type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result; 
    }
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
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
