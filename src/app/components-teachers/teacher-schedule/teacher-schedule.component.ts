import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { SchedulesService } from './../../services/schedules.service';
import { Schedules } from './../../models/schedules.model';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent implements OnInit {

  public schedule: Schedules;
  public schedules: Schedules[];
  public subscription: Subscription;
  public date: string;
  public  welcomename: string; 
  p: number = 1;
  public countSchedules: number;

  public pagesize= 10;
  order: string;
  reverse: boolean = true;

  constructor(public schedulesService: SchedulesService,
              public CookieService: CookieService,
              public routerService: Router
              ) { } 

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
    this.date='7'; 
    this.schedule = new Schedules();
    this.subscription = this.schedulesService.getAllSchedulesByLecturers(this.date).subscribe((data: Schedules[]) => {
      this.schedules = data;
      this.countSchedules=data.length;
      console.log(this.countSchedules);
    })
  }

  counter(i: number){
    return new Array(i);
  }

  onChangeDate1(value){ 
    this.subscription = this.schedulesService.getAllSchedulesByLecturers(value).subscribe((data: Schedules[]) => {
      this.schedules = data;
      console.log(data);
  })

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
