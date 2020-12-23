import { Component, OnInit } from '@angular/core'; 
import * as $ from 'jquery'; 
import { SemesterService } from './../../services/semester.service';
import { TeacherMyclassService } from './../../services/teacher-myclass.service'; 
import { SchedulesService } from './../../services/schedules.service';
import { Class } from './../../models/class.model';
import { Schedules } from './../../models/schedules.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-teacher-dashbroad',
  templateUrl: './teacher-dashbroad.component.html',
  styleUrls: ['./teacher-dashbroad.component.css']
})
export class TeacherDashbroadComponent implements OnInit {

  public clazz: string;
  public clazzs: Class[];
  public schedules: Schedules[];
  public schedule: Schedules[];
  public subscription: Subscription;
  public welcomename: string;
  public date: string;

  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  p: number = 1;

  constructor(public routerService: Router,
    public teachermyclassService: TeacherMyclassService,
    public CookieService: CookieService, public schedulesService: SchedulesService) { }

  ngOnInit(): void {

    this.welcomename=this.CookieService.get("usernamelecturers");

  	$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });

    var dropdown = document.getElementsByClassName("dropdown-btn"); 
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }
    //// view list myclass
    this.subscription = this.teachermyclassService.getfindClazzByLecturer().subscribe(data => {
      this.clazzs = data;
      //console.log(data);

    });
    ///// view schedules 
    // this.subscription = this.teachermyclassService.getfindAllByLecturer().subscribe(data => {
    //   this.schedules = data;
    //   console.log(data);

    // })

    this.date='7';
    this.subscription = this.schedulesService.getAllSchedulesByLecturers('7').subscribe((data: Schedules[]) => {
      this.schedules = data;
      console.log(data);
    })

    //// view schedule date now
    this.subscription = this.teachermyclassService.getfindAllByDateNow().subscribe(data => {
      this.schedule = data;
      console.log(data);

    })


  }

  SendID_Clazz(id_class: string){
    this.CookieService.set('id_class', id_class);
    console.log(this.CookieService.set('id_class', id_class))
  }

  onAttendClazz(id_class: string){
    this.CookieService.set( 'id_clazz' , id_class);
    this.routerService.navigateByUrl('teacher/teacher-attends');
  }

  change(){
    localStorage.removeItem('lecturer');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('lecturer');
    this.CookieService.deleteAll();
    window.location.reload();
  }


}
