import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { AttendsService } from './../../../services/attends.service';
import { StudentsService } from './../../../services/students.service';
import { ClassService } from './../../../services/class.service';
import { CourseService } from './../../../services/course.service';
import { SubjectService } from './../../../services/subject.service';
import { ManageResultService } from './../../../services/manage-result.service';
import { Attends } from './../../../models/attends.model';
import { Students } from './../../../models/students.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { Course } from 'src/app/models/course.model';
import { Subjects } from 'src/app/models/subjects.model';
import { CookieService } from 'ngx-cookie-service';
import { CLazzStudentResult } from 'src/app/models/ClazzStudentResult.model';
import { removeData } from 'jquery';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-manage-attends',
  templateUrl: './manage-attends.component.html',
  styleUrls: ['./manage-attends.component.css']
})
export class ManageAttendsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public attend: Array<Attends> = [];
  public attends: Attends;
  public students: Students[] = [];
  public clazzs: Class[] = [];
  public clazzsResult: Class[];
  public clazzStudent: string;
  public clazzResult: string;
  public results: CLazzStudentResult[];
  public courses: Course[] = [];
  public course: string;
  public clazz: string;
  public search: string;
  public subjects: Subjects[] = [];
  public student: string;
  //public clazz: string;
  name: string;
  p: number = 1;
  public welcome: string;
  public Daotao: string;
  public pagesize= 10;
  show;
  messSuccess: string;
  messErrors: string;

  ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Diemdanh.xlsx');
  }

  constructor(public attendsService: AttendsService,
    public studentsService: StudentsService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    private api: AttendsService,
    public classService: ClassService,
    public courseService: CourseService,
    public subjectService: SubjectService,
    public manageResultService: ManageResultService,
    public cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.welcome = this.cookie.get('username');
    if(this.welcome == "admin"){
      this.show = true;
    }
    //script menu slider
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
    (function (document) {
      'use strict';

      var TableFilter = (function (myArray) {
        var search_input;

        function _onInputSearch(e) {
          search_input = e.target;
          var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
          myArray.forEach.call(tables, function (table) {
            myArray.forEach.call(table.tBodies, function (tbody) {
              myArray.forEach.call(tbody.rows, function (row) {
                var text_content = row.textContent.toLowerCase();
                var search_val = search_input.value.toLowerCase();
                row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
              });
            });
          });
        }

        return {
          init: function () {
            var inputs = document.getElementsByClassName('search-input');
            myArray.forEach.call(inputs, function (input) {
              input.oninput = _onInputSearch;
            });
          }
        };
      })(Array.prototype);

      document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
          TableFilter.init();
        }
      });

    })(document);

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
      })
    });

    this.attends = new Attends();
    this.subscription = this.studentsService.getAllStudents().subscribe((data: Students[]) => {
      this.students = data;
    });

    this.subscription = this.manageResultService.getAllClazz().subscribe((data: Class[]) => {
      this.clazzs = data;
    });
  }

  onSearch() {
    this.subscription = this.attendsService.getFindAttendsByStudentAndClass(this.clazz, this.search).subscribe((data: Attends[]) => {
      this.attend = data;
    });
  }

  onChangeclass(value) {
    this.clazz = value;
  }

  onChangeStudents(valueCate) {
    this.api.getEditAttends(valueCate).subscribe(res => {
      this.attends.id_students = res;
    });
  }

  onChangeFilterClass(valueClazz) { 
    // this.api.getEditClazz(valueClazz).subscribe(res =>{
    //   this.attends.id_schedules.id_class=res;
    // })
    this.subscription = this.attendsService.getAllAttends().subscribe((data: Attends[]) => {
      this.attend = data;
    });
  }

  onAddAttends() {
    if(this.attends.status != null){
    for(var i=0;i<this.attend.length;i++){
        if(this.attend[i].id_attends == this.attends.id_attends){
          this.attend[i].status==this.attends.status;
        }
    }
    
    console.log(this.attends)
    this.subscription = this.attendsService.addAttends(this.attend).subscribe((data: Attends) => {
      this.messSuccess = 'Cập nhật thành công';
      window.location.reload();
    });
    }else {
      this.messErrors = "cập nhật thất bại";
    }
  }

  onEditAttends(attends: Attends) {
    this.attends = attends;
    if (Array.isArray(attends.id_students))
      this.student = attends.id_students.id_students;

    else
      this.student = attends.id_students.id_students;
  }

  change(){
    localStorage.removeItem('admin');
    localStorage.setItem('changePass', JSON.stringify(''));
  }

  logout(): void{
    localStorage.removeItem('admin');
    this.cookie.deleteAll();
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
