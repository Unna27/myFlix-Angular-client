import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// api url to fetch movie data
const apiUrl = 'https://myflix-ur.herokuapp.com/'
@Injectable({
  // scoping the service. root: this service will be available everywhere
  providedIn: 'root'
})

/** 
 * contains functions that makes calls to the movie api end point to fetch requested data
*/
export class FetchAPIDataService {
  /** @constructor - Inject the HttpClient module to the constructor params
    * This will provide HttpClient to the entire class, making it available via this.http 
  */
  constructor(private http: HttpClient) { 
    //dependency injection
  }

  /** 
   * Making the api call for the user registration endpoint 
   * @param userDetails - name, password, email and Datae of Birth
  */
  public userRegistration(userDetails: any): Observable<any> {
    //console.log(userDetails);
    // apiUrl/${users}
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  /** 
   * Making the api call for the user login endpoint. On success, it returns a user object with web token from api (post)
   * @param userDetails - name, password
  */
  public userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * Making the api call to get all movies list (get)
   * @param web token is sent in the header request
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * Making the api call to get a single movie detail (get)
   * @param web token is sent in the header request along with movie name
  */
  getMovie(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  /** 
   * Making the api call to get director details (get)
   * @param web token is sent in the header request along with director name
   * returns director json object
  */
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  } 

  /** 
   * Making the api call to get genre details (get)
   * @param web token is sent in the header request along with movie name
   * returns genre text
  */
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + name + '/genre', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }), responseType: 'text'}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  /** 
   * Making the api call to update details (put)
   * @param web token is sent in the header request along with user details
   * returns updated user json object
  */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${userDetails.username}`, {"email": userDetails.email, "birthdate": userDetails.birthdate}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData), // logic to store in localstorage
      catchError(this.handleError)
    );
  } 

  /** 
   * Making the api call to add a favorite movie to the list (post)
   * @param web token is sent in the header request along with user name and movie id
   * returns updated user json object
  */
  addFavoriteMovie(movieId: any, username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, movieId, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * Making the api call to remove a favorite movie from the list (delete)
   * @param web token is sent in the header request along with user name and movie id
   * returns updated user json object
  */
  removeFavoriteMovie(movieId: any, username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a user. Add responsetype text to handle 200 status text message, as there is no JSOn returned, it goes to error handler
  /** 
   * Making the api call to de-register user (delete)
   * @param web token is sent in the header request along with user name
   * returns a text message
  */
  deRegister(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${userDetails.username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }), responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  /** 
   * function to get user details from localStorage
   * returns user json object
  */
  getUserData() : any{
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

   /** 
   * function to get favorite movies of user from localStorage
   * returns favorite movies json object
  */
  getUserFavoriteMovies() : any{
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies;
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened in FetchAPIdata service; please try again later.');
  }
}

