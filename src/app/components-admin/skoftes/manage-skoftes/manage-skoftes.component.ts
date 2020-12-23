import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { SkoftesService } from './../../../services/skoftes.service';
import { Skoftes } from './../../../models/skoftes.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-skoftes',
  templateUrl: './manage-skoftes.component.html',
  styleUrls: ['./manage-skoftes.component.css']
})
export class ManageSkoftesComponent implements OnInit, OnDestroy {

  public skofte: Skoftes;
  public skoftes: Skoftes[] = [];
  public subscription: Subscription;
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
  messStart: string;
  messEnd: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachcahoc.xlsx');
  }

  constructor(public routerService: Router,
    public skoftesService: SkoftesService,
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

    this.skofte = new Skoftes();
    this.subscription = this.skoftesService.getAllSkoftes().subscribe(data => {
      this.skoftes = data;
    })

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.skoftesService.getSearch(this.key).subscribe(data => {
      this.skoftes=data;
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
      this.skoftes = this.skoftes.filter(res => {
        return res.name.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  onAddSkoftes(): void {
    if(this.skofte.name == null){
      this.messName = "Vui lòng nhập tên ca học!"
    }
    else if(this.skofte.start == null){
      this.messStart = "Vui lòng chọn thời gian bắt đầu!"
    }
    else if(this.skofte.ends == null){
      this.messEnd = "Vui lòng chọn thời gian kết thúc!"
    }
    else if (this.skofte.name != '' && this.skofte.start != '' && this.skofte.ends != '') {
      this.subscription = this.skoftesService.addSkoftes(this.skofte).subscribe((data: Skoftes) => {
        this.routerService.navigate(['admin/manage-skoftes']);
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      })
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateSkoftes() {
    if(this.skofte.name == ''){
      this.messName = "Vui lòng nhập tên ca học!"
    }
    else if (this.skofte.name != '' && this.skofte.start != '' && this.skofte.ends != '') {
    this.subscription = this.skoftesService.updateSkoftes(this.skofte).subscribe((data: Skoftes) => {
      this.skofte = data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
    });
  }else{
     this.messErrors1 = "Cập nhật thất bại!";
  }
  }

  id_skoftess: number;
  onDeleteSkoftes(id_skoftes: number) {
    this.id_skoftess=id_skoftes;
  }

  onDeleteSkoftess(id_skoftes: number) {
    this.subscription = this.skoftesService.deleteSkoftes(this.id_skoftess).subscribe(data => {
      this.upDataAfterDelete(id_skoftes);
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  upDataAfterDelete(id_skoftes: number) {
    let result = 0;
    for (var i = 0; i < this.skoftes.length; i++) {
      if (this.skoftes[i].id_skoftes == id_skoftes) {
        this.skoftes.splice(i, 1);
        break;
      }
    }
  }

  onEditSkoftes(skofte: Skoftes) {
    this.skofte = skofte;
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

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}
