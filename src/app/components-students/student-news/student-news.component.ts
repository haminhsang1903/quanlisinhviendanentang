import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from './../../services/post.service';
import { CategorysService } from './../../services/categorys.service';
import { Categorys } from './../../models/categorys.model';
import { Posts } from './../../models/posts.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-student-news',
  templateUrl: './student-news.component.html',
  styleUrls: ['./student-news.component.css']
})
export class StudentNewsComponent implements OnInit {

  public category: string;
  public categorys: Categorys[];
  public posts: Posts[];
  public posts1: Array<Posts> = [];
  public posts2: Array<Posts> = [];
  public posts3: Array<Posts> = [];
  public subscription: Subscription;
  public welcomename: string;
  p: number = 1;
  public cateId_HT: string;
  public cateId_HP: string;
  public cateId_VL: string;

  constructor(public CookieService: CookieService,
    public postservice: PostService,
    public categorysService: CategorysService,
    public routerService: Router
    ) { }

  ngOnInit(): void {
    this.welcomename = this.CookieService.get("usernamestudent");

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



    this.subscription = this.postservice.getAllPost().subscribe(data => {
      this.posts = data;
      //this.posts1.length=10;
      console.log(data);
    });

    this.subscription = this.categorysService.getAllCategory().subscribe(data => {
      this.categorys = data;
      this.cateId_HT=this.categorys[0].name;
      this.cateId_HP=this.categorys[1].name;
      this.cateId_VL=this.categorys[2].name;
    });

    this.subscription = this.postservice.getByCategorys("HT").subscribe(data => {
      let datasize=0;
      if(data.length <= 10){
         datasize=data.length;
      }else{
         datasize=10;
      }
      for (i = 0; i < datasize; i++) {
        this.posts1.push(data[i]);
      }
      console.log(this.posts1);
    });

    this.subscription = this.postservice.getByCategorys("VL").subscribe(data => {
      let datasize=0;
      if(data.length <= 10){
         datasize=data.length;
      }else{
         datasize=10;
      }
      for (i = 0; i < datasize; i++) {
        this.posts2.push(data[i]);
      }
      console.log(this.posts2);
    });

    this.subscription = this.postservice.getByCategorys("HP").subscribe(data => {
      let datasize=0;
      if(data.length <= 10){
         datasize=data.length;
      }else{
         datasize=10;
      }
      for (i = 0; i < datasize; i++) {
        this.posts3.push(data[i]);
      }
      console.log(this.posts3);
    });
  }

  change(){
    localStorage.removeItem('student');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('student');
    this.CookieService.deleteAll();
    window.location.reload();
  }

}
