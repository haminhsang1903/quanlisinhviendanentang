import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { CategorysService } from './../../../services/categorys.service';
import { Categorys } from './../../../models/categorys.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public category: Categorys[] = [];
  public categorys: Categorys;
  searchcategorys: string;
  name: string;
  search;
  totalRecords: number;
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
  messNull: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachchuyenmuc.xlsx');
  }

  constructor(public categoryService: CategorysService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    public cookie: CookieService
    ) { }

  ngOnInit(): void {

    this.welcome = this.cookie.get('username');
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

    window.setTimeout(function() {
      $(".alert").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
      });
    }, 4000);

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

    // findAll Category
    this.subscription = this.categoryService.getAllCategory().subscribe((data: Categorys[]) => {
      this.category = data;
      this.totalRecords = data.length;
    });

    this.categorys = new Categorys();

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onAddCategory() {
    if (this.categorys.name != '' && this.categorys.id_categorys != '') {
      this.subscription = this.categoryService.addCategory(this.categorys).subscribe((data: Categorys) => {
        this.routerService.navigateByUrl('admin/manage-category');
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      });
    }else{
        this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateCategory(){
    if(this.categorys.name == ''){
       this.messNull="Vui lòng nhập tên chuyên mục!"
    }
    else if(this.categorys.name != ''){
      this.subscription = this.categoryService.updateCategory(this.categorys).subscribe((data: Categorys) => {
      this.categorys=data;
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
      });
    }else{
        this.messErrors1 = "Cập nhật thất bại!";
    }

  }

  // loadData(){
  //   this.subscriptionParams=this.activatedRouteService.params.subscribe((data: Params )=>{
  //        let id_categorys = data['id_categorys'];
  //        this.subscription = this.categoryService.getCategory(id_categorys).subscribe((category : Categorys) =>{
  //        //this.categorys=category;
  //        console.log(category);
  //        });
  //   });
  // }

  onEditload(category: Categorys) {
    this.categorys = category;
  }

  // onEditStudent(){
  //   this.subscription = this.studentService.updateStudent(this.student).subscribe((data: Student) =>{
  //   this.routerService.navigateByUrl('student');
  //   //console.log(data);
  //   });

  // }
  id_categoryss: string;
  onDeleteCategory(id_categorys: string) {
    this.id_categoryss=id_categorys;
  }

  onDeleteCategorys(id_categorys: string) {
    this.subscription = this.categoryService.deleteCategory(this.id_categoryss).subscribe((data: Categorys) => {
      this.updataDataAfterDelete(id_categorys);
      window.location.reload();
    },
    (error) => {
          this.messErrors = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  updataDataAfterDelete(id_categorys: string) {
    for (var i = 0; i < this.category.length; i++) {
      if (this.category[i].id_categorys == id_categorys) {
        this.category.splice(i, 1);
        break;

      }
    }
  }

  // Search(){
  //   if(this.searchcategorys !=""){
  //     this.category=this.category.filter(res=>{
  //     return res.name.toLocaleLowerCase().match(this.searchcategorys.toLocaleLowerCase());
  //   })
  //   }else if(this.searchcategorys ==""){
  //     this.ngOnInit();
  //   }
  // }

  Search() {
    if (this.name != "") {
      this.category = this.category.filter(res => {
        return res.id_categorys.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  change(){
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookie.deleteAll();
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
