import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Class } from 'src/app/models/class.model';
import { EvaluesService } from './../../services/evalues.service';
@Component({
  selector: 'app-list-evalue',
  templateUrl: './list-evalue.component.html',
  styleUrls: ['./list-evalue.component.css']
})
export class ListEvalueComponent implements OnInit {

  public  welcomename: string;
  public subscription: Subscription;
  public class: Class[];
  public classs: Array<Class>=[];

  constructor(
    public CookieService: CookieService, 
    public routerService: Router,
    public evaluesService: EvaluesService
    ) { }

  ngOnInit(): void {
    this.welcomename=this.CookieService.get("usernamestudent");
    this.subscription = this.evaluesService.getClazzEvalue().subscribe((data: Class[]) => {
      this.classs = data;

       if(this.classs.length == 0){

      this.routerService.navigate(['/student/news']);
    }

    });

    console.log(this.classs.length)

   
  }

  EvalueLecturer(classes: Class){
    this.CookieService.set('id_class', classes.id_class);
    this.CookieService.set('id_subject', classes.id_subjects.id_subjects);
    this.CookieService.set('name_subject', classes.id_subjects.name);
    this.routerService.navigateByUrl('start/evalues');
  }

  change(){
    localStorage.removeItem('student');
  }

  logout(){
    localStorage.removeItem('student');
    localStorage.setItem('login', JSON.stringify(''));
    this.CookieService.deleteAll.name;
    this.routerService.navigate(['/']);
  }

}
