import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { AttendsService } from './../../services/attends.service';
import { TeacherMyclassService } from './../../services/teacher-myclass.service';
import { Attends } from './../../models/attends.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-attends',
  templateUrl: './teacher-attends.component.html',
  styleUrls: ['./teacher-attends.component.css'] 
})
export class TeacherAttendsComponent implements OnInit, OnDestroy {

  public welcomename: string;
  public attends: Attends[];
  public attend: Attends;
  public clazz: string;
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public rbs: any;
  checkedIDs = [];
  selectedItemsList = [];
  constructor(public cookie: CookieService,
    public routerService: Router,
    public attendsService: AttendsService,
    public activatedRoute: ActivatedRoute,
    public myclassService: TeacherMyclassService
  ) { }

  ngOnInit(): void {
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

    this.welcomename = this.cookie.get('usernamelecturers');

    this.attend = new Attends();

    this.clazz = this.cookie.get('id_clazz');

    this.subscription = this.myclassService.getByLecturer(this.clazz).subscribe((data: Attends[]) => {
      this.attends = data;
      console.log(data);
    });
  }

  onAddAttendsLecture() {
    
    for (const a of this.attends) {
      this.rbs = document.querySelectorAll('input[name="'+a.id_students.id_students+'"]');
      // console.log(a.id_students.id_students+"value: "+this.rbs[0].checked);
      if(this.rbs[0].checked)
        a.status = 1;
        else 
          a.status = 0;
    }
    // for (const a of this.attends) {
      console.log(this.attends);
    // }
    this.subscription = this.myclassService.addAttendsLecture(this.attends).subscribe((data: Attends[]) => {
      this.routerService.navigate(['teacher/dashboard']);
      //window.location.reload();
    })
  }

  change(){
    localStorage.removeItem('lecturer');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('lecturer');
    this.cookie.deleteAll();
    window.location.reload();
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
  }

}
