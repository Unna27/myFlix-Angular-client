// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchAPIDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  isAuth = false;
  username = '';

  constructor(
    public fetchApiData: FetchAPIDataService,
  ) { }

  /** On initialization, gets user details from localStorage */
  ngOnInit(): void {
    this.getUserDetails();
    //this.getMovies();
  }

 getUserDetails(): void {
    let user = this.fetchApiData.getUserData();
    this.isAuth = user.username?true:false;
    this.username = user.username;
  }
    title = 'myFlix-Angular-client';
}