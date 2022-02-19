import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchAPIDataService } from '../../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form', //<app-user-registration-form></app-user-registration-form> selector could be used in app.component.html
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {
  //component's input from html template
  @Input() userData = { username: '', password: '', email: '', birthdate: '' };

constructor(
    public fetchApiData: FetchAPIDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

// ngOnit method is called once this component receives all its inputs
ngOnInit(): void {
}

/** 
   * function that gets trigerred when Sign up is clicked from welcome page
   * registers user details by making api call
*/
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    this.dialogRef.close(); // This will close the modal on success!
    //console.log("inside registration" + result);
    this.snackBar.open('User registration successful. Login to continue.', 'OK', {
        duration: 2000
      });
    window.alert("Login to continue");
   }, (result) => {
        this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}