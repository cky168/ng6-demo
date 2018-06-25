import { Component, OnInit } from '@angular/core';
import {Observable,of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean>;
    constructor() { }
    ngOnInit() {
        this.login$ = of(true);
    }
    logout() {
        this.login$ = of(false);
    }

}
