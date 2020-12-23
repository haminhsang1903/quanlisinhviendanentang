import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { CourseService } from './../../../services/course.service';
import { NominalClassService } from './../../../services/nominal-class.service';
import { MajorService } from './../../../services/major.service';
import { StudentsService } from './../../../services/students.service';
import { Course } from './../../../models/course.model';
import { NominalClass } from './../../../models/nomialclass.model';
import { Students } from './../../../models/students.model';
import { Major } from './../../../models/major.model'
import { Class } from './../../../models/class.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
 
@Component({
  selector: 'app-nominalclass-addstudent',
  templateUrl: './nominalclass-addstudent.component.html',
  styleUrls: ['./nominalclass-addstudent.component.css']
})
export class NominalclassAddstudentComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  public student: Students;
  public students: Students[];
  public studentss: Students[];
  public studentsPOST: Array<Students> = [];
  public class: Class;
  public classs: Class[];
  public majors: Major[];
  public nominalClass: NominalClass;
  public nominalClasses: NominalClass[];
  public nominalClassess: Array<NominalClass> = [];
  public subscription: Subscription;
  public subscriptionParams: Subscription; 
  public id_major :string;
  public rbs: any;
  public id_clazzNominal: string;
  public id_nominal:string;
  p: number = 1;
  totalRecords: number;
  page: number =1;
  public pagesize= 10;
  search;
  order: string;
  reverse: boolean = true;
  welcome: string;
  show;
  message: string;
  messSuccess: string;
  messErrors: string;
  messDelete: string;

  constructor(public routerService: Router,
  	public nomialclassService: NominalClassService,
    public cookieService: CookieService,
    public majorService: MajorService,
    public studentService: StudentsService
  	) { }

    ///xuat file excel
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachlophoc.xlsx');
  }

  ngOnInit(): void {
  	console.log(this.id_nominal)
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

    this.subscription = this.nomialclassService.getStudentNullNominalClass(this.id_major).subscribe((data: Students[]) => {
      
      this.students=data;
    }) 

    this.subscription = this.majorService.getAllMajor().subscribe((data: Major[]) => {
      
      this.majors=data;
    })

    this.subscription = this.nomialclassService.getAllNominalClass().subscribe((data: NominalClass[]) => {
      
      this.nominalClasses=data;
    })

    this.subscription = this.nomialclassService.getAllNominalClass().subscribe((data: NominalClass[]) => {
      
      this.nominalClasses=data;
    })

    this.subscription = this.nomialclassService.getFindAllNominalclass(this.id_clazzNominal).subscribe((data: Students[]) => {
      console.log(data);
      this.studentss=data;
      /*this.routerService.navigate(['admin/manage-nominalclass']);*/
    })
  }

  onChangeMajor(value){
     this.subscription = this.nomialclassService.getStudentNullNominalClass(value).subscribe((data: Students[]) => {
      console.log(data);
      this.students=data;
      /*this.routerService.navigate(['admin/manage-nominalclass']);*/
    })
  }

  onChangeNominalClassById(value){
  	this.subscription = this.nomialclassService.getFindAllNominalclass(value).subscribe((data: Students[]) => {
      console.log(data);
      this.studentss=data;
      /*this.routerService.navigate(['admin/manage-nominalclass']);*/
    })
  }

  all: any;
  onClickAll() {
    var i = 0;
    var a;
    this.nominalClassess.length = 0;
    for (i = 0; i < this.students.length; i++) {
      this.all = document.querySelectorAll('input[name="clickAll"]');
      this.rbs = document.querySelectorAll('input[name="' + this.students[i].id_students + '"]');
      var selected = undefined;
      for (const al of this.all) {
        if (al.checked) {
          for (const rb of this.rbs) {
            rb.checked = true;
            if(rb.checked){
              selected = rb.value;
            break;
            }
          }
        } else {
          for (const rb of this.rbs) {
            rb.checked = false;
            if(rb.checked){
              selected = rb.value;
              break;
            }
          }
        }

      }
    }
  }

  onAddStudentNominalClass(){
  	var i = 0;
    var a;
    this.nominalClassess.length = 0;
    for (i = 0; i < this.students.length; i++) {
      this.rbs = document.querySelectorAll('input[name="'+this.students[i].id_students+'"]');
      var selected = undefined;
      for (const rb of this.rbs) {
        if (rb.checked) {       
            selected = rb.value;
            console.log(this.students[i]);
            this.studentsPOST.push(this.students[i])
            // let stu = new Students();
            // // stu.id_students = 
            // console.log(selected)

          break;
        }
      }
    }
    if(this.id_nominal !=null){
      //console.log(this.studentsPOST);
      this.subscription = this.nomialclassService.addStudentsToNominalclass(this.id_nominal, this.studentsPOST).subscribe((data: Students) =>{
      console.log(data);
      this.messErrors = '';
      this.messSuccess = "Thêm mới thành công!";
      window.location.reload();
      });
    }else{
      this.messErrors = "Thêm mới thất bại!";
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

   uploadFile() {
   
      let formData = new FormData();
      formData.append('file', this.fileInput.nativeElement.files[0])

      this.studentService.getUploadStudent(formData).subscribe(result => {
      this.message = result.toString();
      console.log(this.message = result.toString());
      console.log(result);
      if(result !=""){
        this.messSuccess = "Thêm mới thành công!";
      }else{
        this.messErrors = "Thêm mới thất bại!";
      }
      window.location.reload();

    },
        (error) => {
          this.messErrors = "Nhập thất bại! Vui lòng kiểm tra lại!";
        }
    );
    
    
  }

  id_studentss: string;
  onDeleteStudent(id_students: string) {
    this.id_studentss=id_students;
  }

  onDeleteStudents(id_students: string) {
    this.subscription = this.studentService.deleteStudents(this.id_studentss).subscribe(data => {
      this.upDataAfterDelete(id_students);
      window.location.reload();
    },
    (error) => {
          this.messDelete = "Xóa thất bại! Vui lòng kiểm tra lại!";
        }
    );
  }

  upDataAfterDelete(id_students: string) {
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].id_students == id_students) {
        this.students.splice(i, 1);
        break;
      }
    }
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
