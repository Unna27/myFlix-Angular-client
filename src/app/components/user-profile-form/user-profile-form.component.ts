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

  constructor(
    public fetchApiData: FetchAPIDataService,
    public dialogRef: MatDialogRef<UserProfileFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

 getUserDetails(): void {
    this.user = JSON.parse(this.fetchApiData.getUserData());
    console.log((this.user));
  }


 editUserDetails(): void {
    this.fetchApiData.editUser(this.user).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp));
      //this.user= JSON.parse(resp);
      return this.user;
    });
  }
}
