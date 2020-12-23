import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(public routerService: Router, public cookieService: CookieService) { }

  ngOnInit(): void {
	
	localStorage.setItem('login', JSON.stringify(''));
	this.cookieService.deleteAll();
	this.routerService.navigateByUrl('');

  	// var str = document.getElementsByTagName('div')[0].innerHTML.toString();
	// var i = 0;
	// document.getElementsByTagName('div')[0].innerHTML = "";

	 

	// setTimeout(function() {
	//     var se = setInterval(function() {
	//         i++;
	//         document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
	//         if (i == str.length) {
	//             clearInterval(se);
	//             document.getElementsByTagName('div')[0].innerHTML = str;
	//         }
	//     }, 10);
	// },0);
  }

}
