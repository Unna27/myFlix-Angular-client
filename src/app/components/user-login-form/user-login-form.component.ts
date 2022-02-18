import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchAPIDataService } from '../../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  //component's input from html template
  @Input() userData = { username: '', password: ''};

constructor(
    public fetchApiData: FetchAPIDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

// ngOnit method is called once this component receives all its inputs
ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    // Store token and user data in localstorage
    localStorage.setItem('token',result.token);
    localStorage.setItem('user',JSON.stringify(result.user));
    this.dialogRef.close(); // This will close the modal on success!
    //console.log("inside login"+ result);
    this.snackBar.open('User login successful', 'OK', {
      duration: 2000
    });
    this.router.navigate(['movies']).then(()=>{
      window.location.reload();
    });
  }, (result) => {
      //console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}