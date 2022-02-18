import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // for handling API requestss
import { RouterModule, Routes  } from '@angular/router'; // for routing
//import angular material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GenreComponent } from './components/genre/genre.component';
import { DirectorComponent } from './components/director/director.component';
import { SynopsisComponent } from './components/synopsis/synopsis.component';

let mainroute: string = "welcome";
const user = localStorage.getItem("user");

if (user) {
 mainroute = "movies"
} else {
  mainroute = "welcome"
}
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'user', component: UserProfileFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: mainroute , pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileFormComponent,
    
    LogoutComponent,
         GenreComponent,
         DirectorComponent,
         SynopsisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
