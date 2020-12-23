import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core'; 
import * as $ from 'jquery';
import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../models/employee.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';
import { Address } from './../../../models/address.model';
import { Districts } from './../../../models/districts.model';
import { Wards } from './../../../models/wards.model';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  public address: Address[];
  public districts: Districts[];
  public wards: Wards[];
  public provence: string;
  public district: string;
  public ward: string;
  public diachi: string;
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public employees: Employee[] = [];
  public employee: Employee;
  key: string
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

  url;
  msg = "";
  
  constructor(
    public employeeService: EmployeeService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    public cookieService: CookieService
  ) { }

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachnhanvien.xlsx');
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

    this.employee = new Employee();

    // findAll Lecturers
    this.subscription = this.employeeService.getAllEmployee().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    });

    this.subscription = this.employeeService.getAddress().subscribe(data => {
      this.address = data;
    })
   }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.employeeService.getSearch(this.key).subscribe(data => {
      this.employees=data;
      console.log(data);
    })  
  }

  onChangeDistricts(value){
    this.subscription = this.employeeService.getDistricts(value).subscribe(data => {
      this.districts = data;
    })
  }

  onChangeWard(value){
    this.subscription = this.employeeService.getWard(this.provence,value).subscribe(data => {
      this.wards = data;
    })
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onAddEmployee() {
    this.employee.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
    if(this.employee.address !='' && this.ward != '' && this.district !='' && this.provence != ''){
    if(this.employee.name == null){
      this.messName = "Vui lòng nhập họ và tên!"
    }
    else if(this.employee.birthday == null){
      this.messBirthday = "Vui lòng chọn ngày sinh!"
    }
    else if(this.employee.gender == null){
      this.messGender = "Vui lòng chọn giới tính!"
    }
    else if(this.url == null){
      this.messAvt = "Vui lòng chọn ảnh!"
    }
    else if(this.employee.identity_card == null){
      this.messCMND = "Vui lòng nhập số CMND"
    }
    else if(this.employee.identity_card.length != 9 && this.employee.identity_card.length != 12){
      this.messErrors = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.employee.phone == null){
      this.messPhone = "Vui lòng nhập số điện thoại"
    }
    else if(reg.test(this.employee.phone)){
      this.messErrors = "Số diện thoại phải nhập là số";
    }
    else if (this.employee.phone.substring(0, 1) != "0") {
      this.messErrors = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.employee.phone.length != 10) {
      this.messErrors = "Số điện thoại phải đủ 10 số";
    }
    else if(this.employee.startdate == null){
      this.messStartdate = "Vui lòng chọn ngày bắt đâu dạy!"
    }
    else if(this.employee.specialized == null){
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
    else if(this.employee.status == null){
      this.messStatus = "Vui lòng chọn trạng thái!"
    }
    else if (this.employee.name != '' && this.employee.identity_card != '' && this.employee.phone != ''
      && this.employee.address != '' && this.employee.startdate != null && this.employee.specialized != ''
      && this.employee.gender != null && this.employee.birthday != null && this.employee.avt != '') {
      this.subscription = this.employeeService.addEmployee(this.employee).subscribe((data: Employee) => {

        const frmData = new FormData();
        const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
        for (var i = 0; i < this.myFiles.length; i++) { 
          frmData.append("file", this.myFiles[i]);
        }
        console.log(data.id_employee)
          this.subscription = this.employeeService.addPostavt(data.id_employee, frmData).subscribe((data: Employee) => {
          });
          this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      });
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
   }
  }

  updateEmployee() {
    this.employee.address = this.diachi+", "+this.ward+", "+this.district+", "+this.provence;
    var reg = /[^0-9.-]/g;
    if(this.employee.address !='' && this.ward != '' && this.district !='' && this.provence != ''){

    if(this.employee.identity_card == ''){
      this.messCMND = "Vui lòng nhập số CMND"
    }
    else if(this.employee.identity_card.length != 9 && this.employee.identity_card.length != 12){
      this.messErrors1 = "Số CMND bắt buộc 9 số hoặc 12 số!"
    }
    else if(this.employee.phone == ''){
      this.messPhone = "Vui lòng nhập số điện thoại"
    }
    else if(reg.test(this.employee.phone)){
      this.messErrors1 = "Số diện thoại phải nhập là số";
    }
    else if (this.employee.phone.substring(0, 1) != "0") {
      this.messErrors1 = "Số điện thoại phải là số bắt đầu bằng chữ số 0";
    }
    else if (this.employee.phone.length != 10) {
      this.messErrors1 = "Số điện thoại phải đủ 10 số";
    }
    else if(this.employee.specialized == ''){
      this.messSpecialized = "Vui lòng nhập chuyên môn!"
    }
    else if(this.diachi == ''){
      this.messAddress4 = "Vui lòng nhập ấp, số nhà, đường!"
    }
    else if (this.employee.name != '' && this.employee.identity_card != '' && this.employee.phone != ''
      && this.employee.address != '' && this.employee.specialized != '' && this.employee.avt != '') {
    this.subscription = this.employeeService.updateEmployee(this.employee).subscribe((data: Employee) => {
      const frmData = new FormData();
      const headers = { 'Authorization': 'Bearer ' +this.cookieService.get('token')};
      for (var i = 0; i < this.myFiles.length; i++) { 
        frmData.append("file", this.myFiles[i]);
      }
       this.myFiles[i]=this.employee.avt;
       this.subscription = this.employeeService.addPostavt(this.employee.id_employee, frmData).subscribe((data: Employee) => {
       });
        this.employee = data;
        this.messErrors1= '';
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
      });
     }else{
       this.messErrors1= "Cập nhật thất bại!";
     }
   }
  }


  onEditloadEmployee(employee: Employee) {
    this.employee = employee;
    var idx = 0;
    while(this.employee.address.includes(",")){
      var i = 0;
      for(i; i < this.employee.address.length; i++){
        if(this.employee.address.charAt(i).includes(",")){
          if(idx == 0){
            this.diachi = this.employee.address.substring(0,i).trim();
          }
          if(idx == 1){
            this.ward = this.employee.address.substring(0,i).trim();
          }
          if(idx == 2){
            this.district = this.employee.address.substring(0,i).trim();
          }
          this.employee.address = this.employee.address.substring(i+1,this.employee.address.length);
          idx += 1;
          break;
        }
      }
      if(this.employee.address.includes(",") == false){
        this.provence = this.employee.address.trim();
      }   
    }
    this.subscription = this.employeeService.getDistricts(this.provence).subscribe(data => {
      this.districts = data;
    })
    this.subscription = this.employeeService.getWard(this.provence,this.district).subscribe(data => {
      this.wards = data;
    })
  }

  id_employees: string;
  onDeleteEmployee(id_employee: string) {
    this.id_employees=id_employee;
  }

  onDeleteEmployees(id_employee: string) {
    this.subscription = this.employeeService.deleteEmployee(this.id_employees).subscribe((data: Employee) => {
      this.updataDataAfterDelete(id_employee);
      window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  updataDataAfterDelete(id_employee: string) {
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id_employee == id_employee) {
        this.employees.splice(i, 1);
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
