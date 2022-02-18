import { Component, OnInit } from '@angular/core';
import { FetchAPIDataService } from 'src/app/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})

export class UserProfileFormComponent implements OnInit {
  user: any = '';
  movies: any[] = [];
  favMoviesList: any[] = [];

  constructor(
    public fetchApiData: FetchAPIDataService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    //if user undefined navigate to welcome page
    if(window.localStorage.getItem('token') === null || window.localStorage.getItem('token')===''){
      this.router.navigate(['welcome']);
    }else{
      this.getUserDetails();
      this.getMovies();
    }

  }

  //get user details
  getUserDetails(): void {
    this.user = this.fetchApiData.getUserData();
    this.user.birthdate= new Date(this.user.birthdate).toLocaleDateString('en-CA');
    //console.log((this.user.birthdate));
    
  }

  // get all the movies from backend
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      this.getFavoriteMovies();
      //return this.movies;
    });
  }
  
  //filter favorite movies details to a list
  getFavoriteMovies(): void {
    let favMovies = this.fetchApiData.getUserFavoriteMovies();
    this.favMoviesList = this.movies.filter((movie) => {
      return favMovies.indexOf(movie._id)>=0 ;
    });
  }

// to update user details in the db
  editUserDetails(): void {
     this.fetchApiData.editUser(this.user).subscribe((resp: any) => {
    //console.log(resp);
    localStorage.setItem('user', JSON.stringify(resp));
    this.snackBar.open('Profile details updated successfully', 'OK', {
      duration: 2000
    });
  });
}

// remove movie from favorites list
removefromFavorites(id: any): void {
  this.fetchApiData.removeFavoriteMovie(id, this.user.username).subscribe((resp: any) => {
    //console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp));
    window.location.reload();
  });
}

// to handle de-registration of user and send details to backend
handledeRegister(): void {
  this.fetchApiData.deRegister(this.user).subscribe((result) => {
    window.localStorage.clear();
    window.location.reload();
    //console.log("inside de-registration" + result);
    this.snackBar.open('User de-registration successful', 'OK', {
        duration: 2000
      });
    }); 
  }
}
