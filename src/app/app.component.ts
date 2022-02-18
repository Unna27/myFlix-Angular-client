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
  //movies: any[] = [];
  //finalMoviesList: any[] = [];
  //favMoviesList: any[] = [];

  constructor(
    public fetchApiData: FetchAPIDataService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    //this.getMovies();
  }

 getUserDetails(): void {
    let user = this.fetchApiData.getUserData();
    this.isAuth = user.username?true:false;
    this.username = user.username;
  }
  /*
   getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.getFavoriteMovies();
      //return this.movies;
    });
  }

  
  getFavoriteMovies(): void {
    let favMovies = this.fetchApiData.getUserFavoriteMovies();
    console.log((favMovies));
    this.favMoviesList = this.movies.filter((movie) => {
      return favMovies.indexOf(movie._id)>=0 ;
    });
    this.finalMoviesList = this.movies.map((movie)=>{
      if(favMovies.indexOf(movie._id)>=0) return {movie:movie, isFavorite:true};
      
      else return {movie:movie,isFavorite:false};
  
     });
    console.log("final"+ this.finalMoviesList);
    console.log("favories"+ this.favMoviesList);
  }
*/
    title = 'myFlix-Angular-client';
}