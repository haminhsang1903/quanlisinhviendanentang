import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { SemesterService } from './../../../services/semester.service';
import { Semester } from './../../../models/semester.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
import { SendmailService } from 'src/app/services/sendmail.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  public To: string;
  public Subject: string;
  public Content: string;
  welcome: string;
  show;
  message: string;
  messSuccess: string;
  messErrors: string;
  @ViewChild('fileInput') fileInput;

  constructor(
    public routerService: Router,
    public activatedRoute: ActivatedRoute,
    public cookieService: CookieService,
    public sendMailService: SendmailService
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
  }

  sendMail() {
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    if(this.To != "" && this.Subject != "" && this.Content != ""){
      this.sendMailService.SendMail(formData, this.To, this.Subject, this.Content).subscribe(mail => {
            this.messSuccess = "Send Mail thành công!";
            window.location.reload();
      });
    }else{
      this.messErrors = "Send Mail thất bại!";
    }
  }

  change() {
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void {
    localStorage.removeItem('admin');
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
