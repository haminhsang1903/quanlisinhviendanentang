import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Schedules } from './../../../models/schedules.model';
import { Lecturers } from './../../../models/lecturers.model';
import { Class } from './../../../models/class.model';
import { Skoftes } from './../../../models/skoftes.model';
import { Rooms } from './../../../models/rooms.model';
import { SchedulesService } from './../../../services/schedules.service'; 
import { TeacherService } from './../../../services/teacher.service';
import { ClassService } from './../../../services/class.service';
import { SkoftesService } from './../../../services/skoftes.service';
import { RoomsService } from './../../../services/rooms.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.css']
})
export class ManageSchedulesComponent implements OnInit, OnDestroy {

  public schedule: Schedules;
  public lec: Lecturers;
  public sko: Skoftes;
  public cla: Class;
  public roo: Rooms;
  public lecture: string;
  public class: string;
  public skofte: number;
  public room: number;
  public schedules: Schedules[] = [];
  public lectures: Lecturers[];
  public clazz: Class[];
  public clazzz: Class;
  public skoftes: Skoftes[];
  public rooms: Rooms[];
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
  messIdRoom: string;
  messIdLec: string;
  messIdClass: string;
  messDate: string;
  messDes: string;
  messIdSklofte: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachlichhoc.xlsx');
  }

  constructor(
    public routerService: Router,
    public activatedRoute: ActivatedRoute,
    public scheduleService: SchedulesService,
    public teacherService: TeacherService,
    public classService: ClassService,
    public skofterService: SkoftesService,
    public roomsService: RoomsService,
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

    this.schedule = new Schedules();
    this.subscription = this.scheduleService.getAllSchedules().subscribe((data: Schedules[]) => {
      this.schedules = data;
    })
    this.lec = new Lecturers();
    // this.subscription = this.teacherService.getAllLecturers().subscribe((data: Lecturers[]) => {
    //   this.lectures = data;
    // })
    this.cla = new Class();
    this.subscription = this.classService.getAllClazz().subscribe((data: Class[]) => {
      this.clazz = data;
    })

    this.sko = new Skoftes();
    this.subscription = this.skofterService.getAllSkoftes().subscribe((data: Skoftes[]) => {
      this.skoftes = data;
    })
    this.roo = new Rooms();
    // this.subscription = this.roomsService.getAllRooms().subscribe((data: Rooms[]) => {
    //   this.rooms = data;
    // })

  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.scheduleService.getSearch(this.key).subscribe(data => {
      this.schedules=data;
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
      this.schedules = this.schedules.filter(res => {
        return res.id_class.id_class.trim().toLocaleLowerCase().match(this.name.trim().toLocaleLowerCase());
      })
    } else if (this.name == "") {
      this.ngOnInit();
    }
  }

  onChangeLectures(valueCate) {
    this.scheduleService.getEditTeacher(valueCate).subscribe(res => {
      this.schedule.id_lecturers = res;
    })
  }

  onChangeClass(valueCate) {
    this.scheduleService.getFilterLecturer(valueCate).subscribe(lec => {
      this.lectures = lec;
    })
    this.scheduleService.getEditClass(valueCate).subscribe(res => {
      this.schedule.id_class = res;
    })
  }

  id_class: string;
  onChangeClasss(valueCla) {
    this.scheduleService.getEditClass(valueCla).subscribe(res => {
      this.id_class=valueCla;
      console.log(this.id_class);
    })
  }

  onChangeSkoftes(valueCate) {
    this.scheduleService.getfillRoomBySkoftesAndDate(this.schedule.date, valueCate, -1).subscribe(roo => {
      this.rooms = roo;
    })
    this.scheduleService.getEditSkoftes(valueCate).subscribe(res => {
      this.schedule.id_skoftes = res;
    })
  }

  onChangeRooms(valueCate) {
    this.scheduleService.getEditRooms(valueCate).subscribe(res => {
      this.schedule.id_rooms = res;
    })
  }
  id_classs: string;
  onAddSchedules(){
    if(this.schedule.id_class == null){
      this.messIdClass = "Vui lòng chọn lớp học!"
    }
    else if(this.schedule.id_lecturers == null){
      this.messIdLec = "Vui lòng chọn giảng viên!"
    }
    else if(this.schedule.date == null){
      this.messDate = "Vui lòng chọn ngày học!"
    }
    else if(this.schedule.id_skoftes == null){
      this.messIdSklofte = "Vui lòng chọn ca học!"
    }
    else if(this.schedule.id_rooms == null){
      this.messIdRoom = "Vui lòng chọn phòng học!"
    }
    else if(this.schedule.description == null){
      this.messDes = "Vui lòng nhập mô tả chung!"
    }
    else if (this.schedule.id_rooms != null && this.schedule.id_lecturers != null 
      && this.schedule.id_class != null && this.schedule.id_skoftes != null && this.schedule.description != '' && this.schedule.date != null) {
      this.subscription = this.scheduleService.addSchedules(this.schedule).subscribe((data: Schedules) => {
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      })
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  onAddAutoSchedules(id_class: string){
    this.subscription = this.scheduleService.addAutoSchedules(this.id_class).subscribe((data: Schedules[]) => {
        this.messSuccess = "Tạo lịch thành công!";
        window.location.reload();
      },(error) => {
        this.messErrors = "Lớp chưa thêm lịch hoặc lớp đã hoàn thành thêm lịch! Vui lòng xem lại!";
      });
  }

  updateSchedule() {
    if(this.schedule.description == ''){
      this.messDes = "Vui lòng nhập mô tả chung!"
    }
    else if (this.schedule.id_rooms != null && this.schedule.id_lecturers != null 
      && this.schedule.id_class != null && this.schedule.id_skoftes != null && this.schedule.description != '' && this.schedule.date != null) {

    this.subscription = this.scheduleService.updateSchedules(this.schedule).subscribe((data: Schedules) => {
      this.schedule = data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
      // console.log(this.lecturer);
    });
  }else{
     this.messErrors1 = "cập nhật thất bại!";
  }
  }

  id_scheduless: number;
  onDeleteSchedules(id_schedules: number) {
    this.id_scheduless=id_schedules;
  }

  onDeleteScheduless(id_schedules: number) {
    this.subscription = this.scheduleService.deleteSchedules(this.id_scheduless).subscribe(data => {
      if (data && data.id_schedules) {
        this.routerService.navigateByUrl('admin/manage-schedules');
      }
      this.routerService.navigateByUrl('admin/manage-schedules');
      window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    )
  }

  upDataAfterDelete(id_schedules: number) {
    let result = 0;
    for (var i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].id_schedules == id_schedules) {
        this.schedules.splice(i, 1);
        break;
      }
    }
  }

  onEditSchedules(schedule: Schedules) {
    this.schedule = schedule;
    //lectures
    if (Array.isArray(schedule.id_lecturers))
      this.lecture = schedule.id_lecturers[0].id_lecturers;
    else
      this.lecture = schedule.id_lecturers.id_lecturers;
    //class
    if (Array.isArray(schedule.id_class))
      this.class = schedule.id_class[0].id_class;
    else
      this.class = schedule.id_class.id_class;
    //skoftes
    if (Array.isArray(schedule.id_skoftes))
      this.skofte = schedule.id_skoftes[0].id_skoftes;
    else
      this.skofte = schedule.id_skoftes.id_skoftes;
    //subject
    if (Array.isArray(schedule.id_rooms))
      this.room = schedule.id_rooms[0].id_rooms;
    else
      this.room = schedule.id_rooms.id_rooms;
    this.scheduleService.getFilterLecturer(schedule.id_class.id_class).subscribe(lec => {
      this.lectures = lec;
    })
    this.scheduleService.getfillRoomBySkoftesAndDate(this.schedule.date, schedule.id_skoftes.id_skoftes, schedule.id_rooms.id_rooms).subscribe(roo => {
      this.rooms = roo;
    })
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
  }

}
