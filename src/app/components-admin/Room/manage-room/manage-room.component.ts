import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { RoomsService } from './../../../services/rooms.service';
import { Rooms } from './../../../models/rooms.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.css']
})
export class ManageRoomComponent implements OnInit, OnDestroy {

  public rooms: Rooms;
  public roomses: Rooms[];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  key: string;
  p: number = 1;
  name: string;
  search;
  welcome: string;
  public pagesize= 10;
  order: string;
  reverse: boolean = true;
  show;

  messSuccess: string;
  messErrors: string;
  messSuccess1: string;
  messErrors1: string;
  messName: string;
  messDes: string;
  messDelete: string;
  
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachphonghoc.xlsx');
  }

  constructor(
    public routerService: Router,
    public roomsService: RoomsService,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService
    ) { }

  ngOnInit(): void {
    this.welcome = this.cookieService.get('username');
    if(this.welcome == "admin"){
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

   // validation form
    (function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
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
    $(document).ready(function()
         {
        $('#mod_cls').on('click', function () {
      $('#Q_A').trigger("reset");
        console.log($('#Q_A'));
     })
    });

    this.rooms = new Rooms();
    this.subscription = this.roomsService.getAllRooms().subscribe(data => {
      this.roomses = data;
      this.totalRecords = data.length;
    })
    this.rooms = new Rooms();
  }

  onSearch(){
    if(this.key == ''){
      this.ngOnInit();
    }
      console.log(this.key)
    this.subscription = this.roomsService.getSearch(this.key).subscribe(data => {
      this.roomses=data;
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

  onAddRooms(): void {
    if(this.rooms.name == null){
      this.messName = "Vui lòng nhập tên phòng!"
    }
    else if(this.rooms.notes == null){
      this.messDes = "Vui lòng nhập mô tả!"
    }
    else if(this.rooms.name != '' && this.rooms.notes != ''){
      this.subscription = this.roomsService.addRooms(this.rooms).subscribe((data: Rooms) => {
        this.routerService.navigate(['admin/manage-room']);
        console.log(this.rooms)
        this.messErrors = '';
        this.messSuccess = "Thêm mới thành công!";
        window.location.reload();
      })
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  updateRooms(){
    if(this.rooms.name == ''){
      this.messName = "Vui lòng nhập tên phòng!"
    }
    else if(this.rooms.notes == ''){
      this.messDes = "Vui lòng nhập mô tả!"
    }
    else if(this.rooms.name != '' && this.rooms.notes != ''){
    this.subscription = this.roomsService.updateRoom(this.rooms).subscribe((data: Rooms) => {
      this.rooms=data;
      this.messErrors1 = '';
      this.messSuccess1 = "Cập nhật thành công!";
      window.location.reload();
     // console.log(this.lecturer);
    });
  }else{
     this.messErrors1 = "Cập nhật thất bại!";
  }
  }

  id_roomss: number;
  onDeleteRooms(id_rooms: number) {
    this.id_roomss=id_rooms;
  }

  onDeleteRoomss(id_rooms: number) {
    this.subscription = this.roomsService.deleteRooms(this.id_roomss).subscribe(data => {
        this.upDataAfterDelete(id_rooms);
        window.location.reload();
    },
    (error) => {
            this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
          }
    );
  }

  upDataAfterDelete(id_rooms: number) {
    let result = 0;
    for (var i = 0; i < this.roomses.length; i++) {
        if (this.roomses[i].id_rooms == id_rooms) {
            this.roomses.splice(i, 1);
            break;
        }
    }
  }

  onEditRooms(rooms: Rooms){
    this.rooms = rooms;
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

