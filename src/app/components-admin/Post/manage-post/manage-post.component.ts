import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as jquery from 'jquery';
import { CategorysService } from './../../../services/categorys.service';
import { PostService } from './../../../services/post.service';
import { Categorys } from './../../../models/categorys.model';
import { Posts } from './../../../models/posts.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css'],
})
export class ManagePostComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public categorys: Categorys[];
  public category: string;
  public post: Posts[] = [];
  public posts: Posts;
  public Selectcategorys: string;
  key: string;
  name: string;
  search;
  p: number = 1;
  welcome: string;
  public pagesize = 10;
  order: string;
  reverse: boolean = true;
  show;
  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messTitle: string;
  messDes: string;
  messIdcate: string;
  public cateId_HT: string;
  public cateId_HP: string;
  public cateId_VL: string;
  messDelete: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachbaidang.xlsx');
  }

  constructor(
    public categoryService: CategorysService,
    public postservice: PostService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    private api: PostService,
    public cookieService: CookieService
  ) { }

  ngOnInit(): void {

    this.welcome = this.cookieService.get('username');
    if (this.welcome == "admin") {
      this.show = true;
    }
    /*$('#renderbutton').on('click', function (){
      $('#myTab a[href="#home"]').tab('show');

    });*/

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

    this.posts = new Posts();
    // this.category = new Categorys();

    //load combobox category form
    this.subscription = this.categoryService
      .getAllCategory()
      .subscribe((data: Categorys[]) => {
        this.categorys = data;
    });

    //load data post to table
    this.subscription = this.postservice
      .getAllPost()
      .subscribe((data: Posts[]) => {
        this.post = data;
      });
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.postservice.getSearch(this.key).subscribe(data => {
      this.post=data;
      console.log(data);
    })  
  }

  //  loadData(id_post: string){
  //   this.subscriptionParams=this.activatedRouteService.params.subscribe((data: Params )=>{
  //        let id_post = data['id_post'];
  //        this.subscription = this.postservice.getPost(id_post).subscribe((post : Posts) =>{
  //        //this.categorys=category; 
  //        console.log(post);
  //        });
  //   });
  // }
  // Catch ngChangeModel
  onChange(valueCate) {
    this.api.getOne(valueCate).subscribe(res => {
      console.log(res);
      this.posts.id_categorys = res;
      console.log(this.posts.id_categorys);
    });
    //console.log(valueCate);
    


  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onAddPosts() {
    if(this.posts.title == null){
      this.messTitle = "Vui lòng nhập tiêu đề!"
    }
    else if(this.posts.description == null){
      this.messDes = "Vui lòng nhập Nội dung!"
    }
    else if(this.posts.id_categorys == null){
      this.messIdcate = "Vui lòng chọn chuyên mục!"
    }
    else if (this.posts.id_categorys != null && this.posts.title != ''
      && this.posts.description != '' && this.posts.href != '') {

      this.subscription = this.postservice.addPost(this.posts).subscribe((data: Posts) => {
        this.messErrors = '';
          this.messSuccess = "Thêm mới thành công!";
          this.routerService.navigateByUrl('admin/manage-post');
          window.location.reload();
        });
    } else {
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updatePosts() {
    if(this.posts.title == ''){
      this.messTitle = "Vui lòng nhập tiêu đề!"
    }
    else if(this.posts.description == ''){
      this.messDes = "Vui lòng nhập Nội dung!"
    }
    else if (this.posts.title != '' && this.posts.description != '' && this.posts.href != '') {
      this.subscription = this.postservice.updatePost(this.posts).subscribe((data: Posts) => {
        this.posts = data;
        this.messErrors1 = '';
        this.messSuccess1 = "Cập nhật thành công!";
        window.location.reload();
        // console.log(this.lecturer);
      });
    } else {
      this.messErrors1 = "Cập thất bại!";
    }
  }

  id_posts: number;
  onDeletePost(id_post: number) {
    this.id_posts=id_post;
  }

  onDeletePosts(id_post: number) {
    this.subscription = this.postservice.deletePost(this.id_posts).subscribe((data: Posts) => {
        this.updataDataAfterDelete(this.id_posts);
        window.location.reload();
      },
      (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
      );
  }

  updataDataAfterDelete(id_post: number) {
    for (var i = 0; i < this.post.length; i++) {
      if (this.post[i].id_post === id_post) {
        this.post.splice(i, 1);
        break;
      }
    }
  }

  onEditloadPost(posts: Posts) {
    this.posts = posts;
    if (Array.isArray(posts.id_categorys))
      this.category = posts.id_categorys[0].id_categorys;
    else
      this.category = posts.id_categorys.id_categorys;
    // console.log(posts);
    // console.log(this.postservice.cateBySang);
    // this.api.getOne(this.category).subscribe(res => {
    //   // handle response});
    //   console.log(res);
    // });

  }


  /*  updateID(event) {
  this.posts.id_post = event.something;
  }*/

  // compareByOptoinId(idFirts, idSecond) {
  //   return idFirts && idSecond && idFirts.id == idSecond.id;
  // }

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
