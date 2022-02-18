import { Component, OnInit } from '@angular/core';
import { FetchAPIDataService } from 'src/app/fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit {
  user: any = '';
  favMovies: any[] = [];
  movies: any[] = [];
  favMoviesList: any[] =[];

  constructor(
    public fetchApiData: FetchAPIDataService,
    //public dialogRef: MatDialogRef<UserProfileFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserDetails();
  
  }

 getUserDetails(): void {
    this.user = this.fetchApiData.getUserData();
    console.log((this.user));
    return this.user;
  }


// to update user details in the db
 editUserDetails(): void {
   console.log(this.user.birthdate);
    this.fetchApiData.editUser(this.user).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp));
     // this.dialogRef.close();
      this.snackBar.open('Profile details updated successfully', 'OK', {
        duration: 2000
      });
    });
  }


// This is the function responsible for sending the form inputs to the backend
handledeRegister(): void {
  this.fetchApiData.deRegister(this.user).subscribe((result) => {
    localStorage.clear();
    //this.dialogRef.close(); // This will close the modal on success!
    console.log("inside de-registration" + result);
    this.snackBar.open('User de-registration successful', 'OK', {
        duration: 2000
      });
    });
  }
}
