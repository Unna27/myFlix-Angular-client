import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from 'src/app/components/user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from 'src/app/components/user-registration-form/user-registration-form.component';
import { UserProfileFormComponent } from '../user-profile-form/user-profile-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }
  
  // This is the function that will open the dialog when the login button is clicked  
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {width: '280px'});
  }

  // This is the function that will open the dialog when the userprofile button is clicked  
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileFormComponent, {width: '500px'});
  }


}
