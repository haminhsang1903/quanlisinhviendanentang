import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { MajorService } from './../../../services/major.service';
import { Major } from './../../../models/major.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-major',
  templateUrl: './manage-major.component.html',
  styleUrls: ['./manage-major.component.css']
})
export class ManageMajorComponent implements OnInit, OnDestroy {

  public major: Major;
  public majors: Major[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
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
  messName: string;
  messDelete: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachnganhhoc.xlsx');
  }

  constructor(
    public routerService: Router,
    public majorService: MajorService,
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

    //
    var modal = document.getElementById('id01');
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    this.major = new Major();
    this.subscription = this.majorService.getAllMajor().subscribe(data => {
      this.majors = data;
      this.totalRecords = data.length;
    })
    this.major = new Major();
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.majorService.getSearch(this.key).subscribe(data => {
      this.majors=data;
      console.log(data);
    })  
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

  onAddMajor(): void {
    if(this.major.name == null){
      this.messName = "Vui lòng nhập tên ngành!"
    }
    else if (this.major.id_major != '' && this.major.name != '') {
      this.subscription = this.majorService.addMajor(this.major).subscribe((data: Major) => {
        this.routerService.navigate(['admin/manage-major']);
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      }, (error) => {
        this.messErrors = error.error.message;
      });
    } else {
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateMajor() {
    if(this.major.name == ''){
      this.messName = "Vui lòng nhập tên ngành!"
    }
    else if (this.major.name != '') {
      this.subscription = this.majorService.updateMajor(this.major).subscribe((data: Major) => {
        this.major = data;
        this.messErrors1 = '';
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
      });
    } else {
      this.messErrors1 = "Cập nhật thất bại!";
    }
  }

  id_majorr: string;
  onDeleteMajor(id_major: string) {
    this.id_majorr=id_major;

  }

  onDeleteMajors(id_major: string) {
    console.log(id_major);
    this.subscription = this.majorService.deleteMajor(this.id_majorr).subscribe(data => {
      this.upDataAfterDelete(id_major);
      window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );

  }

  upDataAfterDelete(id_major: string) {
    let result = 0;
    for (var i = 0; i < this.majors.length; i++) {
      if (this.majors[i].id_major == id_major) {
        this.majors.splice(i, 1);
        break;
      }
    }
  }

  onEditMajor(major: Major) {
    this.major = major;
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
