import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { TeacherImportscoreService } from './../../../services/teacher-importscore.service';
import * as $ from 'jquery';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-importscore',
  templateUrl: './manage-importscore.component.html',
  styleUrls: ['./manage-importscore.component.css']
})
export class ManageImportscoreComponent implements OnInit {

  public welcome: string;

  @ViewChild('fileInput') fileInput;
  public id_class: string;  
  message: string; 
  messSuccess: string;
  messErrors: string;
  show;

  constructor(private httpService: HttpClient,
               public cookieService: CookieService,
               public teacherImportscoreService: TeacherImportscoreService,
               public routerService: Router) { }

  ngOnInit(): void {
  	this.welcome = this.cookieService.get('usernamedaotao');
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

   }




  // getFileDetails (e) {
  //   for (var i = 0; i < e.target.files.length; i++) { 
  //     this.myFiles.push(e.target.files[i]);
  //   }
  // }

  // uploadFiles () {
  //   const frmData = new FormData();
    
  //   const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};

  //   this.httpService.post('https://serverrunordie.herokuapp.com/api/import/fileExcel',  {headers}).subscribe(
  //     data => {
  //       this.sMsg = data as string;
  //       console.log (this.sMsg);
  //     },
  //   );

  // }

  uploadFile() {  
    let formData = new FormData();  
    formData.append('file', this.fileInput.nativeElement.files[0])  
  
    this.teacherImportscoreService.UploadExcel(formData, this.id_class).subscribe(result => {  
      this.message = result.toString();
      console.log(this.message = result.toString());

      this.messSuccess="Nhập điểm thành công thành công!";

    });   
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

