import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { ManageResultService } from './../../../services/manage-result.service';
import { Class } from './../../../models/class.model';
import { Results } from './../../../models/results.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css']
})
export class ManageResultComponent implements OnInit {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public clazzs: Class[];
  public results: Array<Results> = [];
  public result: Results;
  public clazz: string;
  public search: string;
  p: number = 1;
  name: string;
  welcome: string;
  public pagesize = 10;
  show;
  messSuccess: string;
  messErrors: string;
  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Bangdiem.xlsx');
  }

  constructor(public routerService: Router,
    public manageResultService: ManageResultService,
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

    ////search filter
    (function () {
      'use strict';

      var TableFilter = (function () {
        var Arr = Array.prototype;
        var input;

        function onInputEvent(e) {
          input = e.target;
          var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
          Arr.forEach.call(table1, function (table) {
            Arr.forEach.call(table.tBodies, function (tbody) {
              Arr.forEach.call(tbody.rows, filter);
            });
          });
        }

        function filter(row) {
          var text = row.textContent.toLowerCase();
          var val = input.value.toLowerCase();
          row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
          init: function () {
            var inputs = document.getElementsByClassName('table-filter');
            Arr.forEach.call(inputs, function (input) {
              input.oninput = onInputEvent;
            });
          }
        };

      })();

      TableFilter.init();
    })();

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

    this.result = new Results();


    this.subscription = this.manageResultService.getAllClazz().subscribe((data: Class[]) => {
      this.clazzs = data;
    });

  }

  onUpResult() {
    var reg = /[^0-9.-]/g;
    if(this.result.score < 0 || this.result.score > 10){
       this.messErrors = "Điểm phải lớn hoặc bằng 0 và bé hơn hoặc bằng 10";
    }
    else if (this.result.name != '' && this.result.score != null) {
      
      for(var i=0;i<this.results.length;i++){
        if(this.results[i].id_results == this.result.id_results){
          this.results[i].score==this.result.score;
        }
      }

      this.subscription = this.manageResultService.AddResult(this.results).subscribe((data: Results) => {
        console.log(this.results)
        console.log(data);
        this.messSuccess = 'Cập nhật thành công';
        window.location.reload();
      }); 
    

    } else {
      this.messErrors = "cập nhật thất bại";
    }
  }

  onSearch() {
    this.subscription = this.manageResultService.getAllByClazzAndStudent(this.clazz, this.search).subscribe((data: Results[]) => {
      this.results = data;
    });
  }

  onChangeclass(value) {
    this.clazz = value;
  }

  onEditResult(result: Results) {
    this.result = result;
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
