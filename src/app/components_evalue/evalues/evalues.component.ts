import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Evaluetes } from './../../models/evaluetes.model';
import { Lecturers } from 'src/app/models/lecturers.model';
import { EvaluesService } from 'src/app/services/evalues.service';
import { ClassService } from './../../services/class.service';
import { Class } from 'src/app/models/class.model';

@Component({
  selector: 'app-evalues',
  templateUrl: './evalues.component.html',
  styleUrls: ['./evalues.component.css']
})
export class EvaluesComponent implements OnInit {
  
  public  welcomename: string;
  public subscription: Subscription;
  public lecturers: Lecturers;
  public class: Class;
  public evaluetes: Evaluetes;
  public id_clazz: string;
  public id_subject: string;
  public name_subject: string;
  constructor(
    public CookieService: CookieService, 
    public routerService: Router,
    public evaluesService: EvaluesService,
    public classService: ClassService
  ) { }

  ngOnInit(): void {
    this.welcomename=this.CookieService.get("usernamestudent");
    this.id_clazz = this.CookieService.get('id_class');
    this.id_subject = this.CookieService.get('id_subject');
    this.name_subject = this.CookieService.get('name_subject');
    this.evaluetes = new Evaluetes();
    this.subscription = this.evaluesService.getLecturefindByClazz(this.id_clazz).subscribe((data: Lecturers) => {
      this.lecturers = data;
    });
    this.subscription = this.classService.getOneClass(this.id_clazz).subscribe((data: Class) => {
      this.class = data;
    });
  }

  onAddEvalue(){
    this.evaluetes.id_class = this.class;
    this.evaluetes.id_lecturers = this.lecturers;
    console.log(this.evaluetes);
    this.subscription = this.evaluesService.addEvalue(this.evaluetes).subscribe((data: Evaluetes) => {
      this.evaluetes = data;    
      this.routerService.navigateByUrl('/student/list-evalue');
    });

  }

}
