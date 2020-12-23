import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { TeacherImportscoreService } from './../../services/teacher-importscore.service'; 
import { ClassService } from './../../services/class.service'; 
import { Class } from 'src/app/models/class.model'; 
import * as $ from 'jquery';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs'; 
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-import-score',
  templateUrl: './import-score.component.html',
  styleUrls: ['./import-score.component.css']
})
export class ImportScoreComponent implements OnInit {

  public welcomename: string;
  id_class: string;

  @ViewChild('fileInput') fileInput;  
  public subscription: Subscription;
  public clazzs: Class[];
  public clazzscore: string;
  message: string; 
  messSuccess: string;
  messErrors: string;

  constructor (private httpService: HttpClient,
               public cookieservice: CookieService,
               public teacherImportscoreService: TeacherImportscoreService,
               public classService: ClassService,
               public routerService: Router
               ) {  }

  // myFiles:string [] = []; 
  // sMsg:string = '';

  ngOnInit () { 
    
    this.welcomename=this.cookieservice.get("usernamelecturers");
    this.id_class=this.cookieservice.get('id_class');
    console.log(this.id_class=this.cookieservice.get('id_class'))

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
      if(result !=""){
      this.messSuccess="Nhập điểm thành công thành công!";
      this.routerService.navigate(['/teacher/dashboard']);
      }else{
        this.messErrors="Nhập điểm thất bại!";
      }
    },
        (error) => {
          this.messErrors = "Nhập điểm thất bại! Vui lòng kiểm tra lại!";
        }
    );   
  }

  DownloadfileExcel(){
    this.subscription = this.teacherImportscoreService.getFileRs(this.id_class).subscribe(data => {
        console.log(data);
      });
  }

  DownloadfileExcel1() {

    const type = 'application/vnd.ms-excel';
    const headerss = { headers: new Headers({ 'Accept': type }) };
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
    const filename = '.xls';

    this.teacherImportscoreService.getFileRs(this.id_class)
      .toPromise()
      .then(response => this.saveToFileSystem(response, type, filename));
    return false;
    }

  private saveToFileSystem(response, __type, filename) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');

    if (contentDispositionHeader !== null) {
      const parts: string[] = contentDispositionHeader.split(';');
      //const filename = parts[1].split('=')[1];
      const blob = new Blob([response._body], { type: __type });
      saveAs(blob, filename);
    } else {
      alert('Cant download.....');
      // handling download condition if content disposition is empty
      const blob = new Blob([response._body], { type: __type });
      saveAs(blob, filename);
    }
  }

  change(){
    localStorage.removeItem('lecturer');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('lecturer');
    this.cookieservice.deleteAll();
    window.location.reload();
  }

}
