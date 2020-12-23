import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from './../../services/post.service';
import { Categorys } from './../../models/categorys.model';
import { Posts } from './../../models/posts.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-student-new-hp',
  templateUrl: './student-new-hp.component.html',
  styleUrls: ['./student-new-hp.component.css']
})
export class StudentNewHPComponent implements OnInit {

  public category: string;
  public categorys: Categorys[];
  public posts: Posts[];
  public posts1: Array<Posts> = [];
  public subscription: Subscription;
  public welcomename: string;
  p: number = 1;

  constructor(public CookieService: CookieService,
    public postservice: PostService,
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

    this.subscription = this.postservice.getByCategorys("HP").subscribe(data => {
      this.posts1=data;
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
