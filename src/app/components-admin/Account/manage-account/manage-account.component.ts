import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Roles } from 'src/app/models/role.model';
import { AccountService } from './../../../services/account.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeacherImportscoreService } from 'src/app/services/teacher-importscore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  public subscription: Subscription;
  public accounts: Account[];
  public roles: Roles[];
  public account: Account;
  public role: number;
  public roleadd: Array<Roles> = [];
  p: number = 1;
  order: string;
  name: string;
  search;
  reverse: boolean = true;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messNullPass: string;
  messDelete: string;
  rbs: any;
  welcome: string;
  public pagesize= 10;
  show;
  public tongso: number;
  key: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachtaikhoan.xlsx');
  }

  constructor(
    public accountService: AccountService,
    public cookieService: CookieService,
    public routerService: Router
  ) { }

  ngOnInit(): void {
    this.welcome = this.cookieService.get('username');

    if(this.welcome == "admin"){
      this.show = true;
    }
        
    //script menu slider
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
    this.account = new Account();
    this.subscription = this.accountService.getAllAccount().subscribe((data: Account[]) => {
      this.accounts = data;
      this.tongso = data.length;
    });

    this.subscription = this.accountService.getRoles().subscribe((data: Roles[]) => {
      this.roles = data;
    });

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
    this.subscription = this.accountService.getSearch(this.key).subscribe(data => {
      this.accounts=data;
    })
  }

   Search() {
    if (this.name != "") {
      this.accounts = this.accounts.filter(res => {
        return res.username.trim().toLowerCase().match(this.name.trim().toLowerCase());
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

  onEditloadAccount(account: Account) {
    this.role = account.roles[0].id;
    this.subscription = this.accountService.getOneRole(this.role).subscribe((data: Roles) => {
      this.roleadd.push(data);
    });
    this.account = account;
  }

  onChangeRoles(newItem) {
    this.role = newItem;
    this.roleadd = [];
    this.subscription = this.accountService.getOneRole(this.role).subscribe((data: Roles) => {
      this.roleadd.push(data);
    });
    this.account.roles = this.roleadd;
  }

  onAddAccount() {
    if (this.account.password != null && this.account.username != null  && this.account.roles != null) {
      this.subscription = this.accountService.getOneRole(this.role).subscribe((data: Roles) => {
        this.roleadd.push(data);
      });
      this.account.roles = this.roleadd;
      this.subscription = this.accountService.addAccount(this.account).subscribe((data: Account) => {
        this.account = data;
        window.location.reload();
      });
      this.messSuccess = "Thêm mới thành công!";
    }
    else {
      //this.messErrors="Thêm mới thất bại!";
    }

  }

  updateAccount() {
    if(this.account.password == ''){
      this.messNullPass="Vui lòng nhập password!"
    }
    else if(this.account.password != ''){
      this.subscription = this.accountService.updateAccount(this.account).subscribe((data: Account) => {
        this.account = data;
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
      });
    }else{
      this.messErrors1 = "Cập nhật thất bại!";
    }
    
  }
  
  ids: number;
  deleteAccount(id: number) {
    this.ids=id;
  }

  deleteAccounts(id: number) {
    this.subscription = this.accountService.deleteAccount(this.ids).subscribe((data: Account[]) => {
      this.accounts = data;
      this.upDataAfterDelete(id);
      window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
    // window.location.reload();
  }

  ViewProfile(account: Account) {
    if (account.roles[0].name == 'ROLE_DAO_TAO') {
      this.subscription = this.accountService.getUsernameEmployee(account.username).subscribe(employee => {
        this.cookieService.set('DT', employee.id_employee);
         this.routerService.navigateByUrl('admin/profile-employee');
      });
    } else if (account.roles[0].name == 'ROLE_GIANG_VIEN') {
      this.subscription = this.accountService.getUsernameLecturer(account.username).subscribe(lecturers => {
        this.cookieService.set('GV', lecturers.id_lecturers);
        this.routerService.navigateByUrl('admin/profile-teacher');
      });
    }
    else if (account.roles[0].name == 'ROLE_SINH_VIEN') {
      this.subscription = this.accountService.getUsernameStudent(account.username).subscribe(students => {
        this.cookieService.set('SV', students.id_students);
        this.routerService.navigateByUrl('admin/profile-student');
      });
    }
  }

  upDataAfterDelete(id: number) {
    let result = 0;
    for (var i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].id == id) {
        this.accounts.splice(i, 1);
        break;
      }
    }
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }
}