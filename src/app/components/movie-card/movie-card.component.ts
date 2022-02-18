import { Component, OnInit } from '@angular/core';
import { FetchAPIDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favMoviesList: any[] = [];

  constructor(public fetchApiData: FetchAPIDataService) { }

  // similar to componentdidmount
  ngOnInit(): void {
    this.getMovies();
    console.log(history.state);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.getFavoriteMovies();
      return this.movies;
    });
  }

  
  getFavoriteMovies(): void {
      let favMovies = this.fetchApiData.getUserFavoriteMovies();
    console.log((favMovies));
    
    this.favMoviesList = this.movies.map((movie)=>{
      if(favMovies.indexOf(movie._id)>=0)  return {movie:movie, isFavorite:true};
      else return {movie:movie,isFavorite:false};
      //return (favMovies.indexOf(movie._id)>=0);
     });
    console.log(this.favMoviesList);
  }


  getGenreDetails<String>(name: string): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      console.log(resp);
     // return this.movies;
    });
  }

  getDirectorDetails<String>(name: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      console.log(resp);
     // return this.movies;
    });
  }

  addtoFavorites(id: any): void {
    let user = this.fetchApiData.getUserData();
    console.log(user.username);
    this.fetchApiData.addFavoriteMovie(id, user.username).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp));
      let favicon = document.getElementById('favorite');
      console.log(favicon);
      //favicon?.setAttribute('color','accent');
     // return this.movies;
    });
  }

  removefromFavorites(id: any): void {
    let user = this.fetchApiData.getUserData();
    console.log(user.username);
    this.fetchApiData.removeFavoriteMovie(id, user.username).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp));
     // let favicon = document.getElementById('favorite');
      //console.log(favicon);
      //favicon?.setAttribute('color','accent');
     // return this.movies;
    });
  }

  toggleButton(movie:any) {
  if(!movie.isFavorite){
    this.addtoFavorites(movie._id);
  }else{
    this.removefromFavorites(movie._id);
  }
  movie.isFavorite = !movie.isFavorite;
  console.log(movie.isFavorite);
}
}
function input() {
  throw new Error('Function not implemented.');
}

