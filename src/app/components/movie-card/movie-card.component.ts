import { Component, OnInit } from '@angular/core';
import { FetchAPIDataService } from 'src/app/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

export class MovieCardComponent implements OnInit {
  
  movies: any[] = [];
  finalMoviesList: any[] = [];

  constructor(
    public fetchApiData: FetchAPIDataService,
    public dialog: MatDialog
  ) { }

  // similar to componentdidmount
  ngOnInit(): void {
   this.getMovies();
   
  }

  // get all movies from backend
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      this.getFavoriteMovies();
      return this.movies;
    });
  }
 
 // create a movies list array with isFavorite var for styling
  getFavoriteMovies(): void {
    let favMovies = this.fetchApiData.getUserFavoriteMovies();
    
    this.finalMoviesList = this.movies.map((movie)=>{
      if(favMovies.indexOf(movie._id)>=0)  return {movie:movie, isFavorite:true};
      else return {movie:movie,isFavorite:false};
     });
    //console.log("final"+this.finalMoviesList);
  }

  // get genre details from backend open genre dialog
  getGenreDetails<String>(name: string): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
    //console.log(resp);
    this.dialog.open(GenreComponent, {
        width: '280px',
        data: {name: name,
        genre: resp},
      });
    });
  }

  //get director details from backend and open director dialog
  getDirectorDetails<String>(name: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      //console.log(resp);
      this.dialog.open(DirectorComponent,{
        width: '500px',
        data: { name: name,
        director: resp},
      });
     
    });
  }

  // open synopsis dialog to display single movie details
  getSynopsis<String>(movieHandle: any): void {
   this.dialog.open(SynopsisComponent,{
        width: '600px',
        data: { movieHandle },
      });
  }

  // connect to backend to add selected movie to favorites list
  addtoFavorites(id: any): void {
    let user = this.fetchApiData.getUserData();
    //console.log(user.username);
    this.fetchApiData.addFavoriteMovie(id, user.username).subscribe((resp: any) => {
      //console.log("updated user"+ resp);
      localStorage.setItem('user',JSON.stringify(resp));
    });
  }

  // connect to backend to remove selected movie from favorites list
  removefromFavorites(id: any): void {
    let user = this.fetchApiData.getUserData();
    //console.log(user.username);
    this.fetchApiData.removeFavoriteMovie(id, user.username).subscribe((resp: any) => {
      //console.log("updated user"+ resp);
      localStorage.setItem('user',JSON.stringify(resp));
    });
  }

  //handle toggle event from favorite icon to add/remove movie from favorite list
  toggleButton(movieHandle:any) {
    !movieHandle.isFavorite ? this.addtoFavorites(movieHandle.movie._id) : this.removefromFavorites(movieHandle.movie._id);
    movieHandle.isFavorite = !movieHandle.isFavorite;
    //console.log(movieHandle.isFavorite);
  }
}

