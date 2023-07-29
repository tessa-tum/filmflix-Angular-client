import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://filmflix-api.herokuapp.com/';
const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  // make HttpClient available to entire class via this.http
  constructor(private http: HttpClient) {}

  // make api call for 
  // ... user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // ... user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // ... get all movies endpoint
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... get one movie endpoint
  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/title/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get a JSON object of a single movie by _id
  getMovieById(MovieID: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  // ... get one director endpoint
  getOneDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... get one genre endpoint
  getOneGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... get one user endpoint
  getOneUser(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... get favourite movies from a user endpoint
  getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => {
          return data.FavoriteMovies}),
        catchError(this.handleError)
      );
  }

  // ... add a movie to favourite movies list endpoint
  addFavoriteMovie(MovieID: string): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + MovieID,
        {
          FavoriteMovies: MovieID,
        },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // check if a movie was already added to list of favorite movies
  isFavoriteMovie(MovieID: string): boolean {
    return user.FavoriteMovies.indexOf(MovieID) >= 0;
  }

  // ... update user endpoint
  updateUser(updatedUser: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... delete user endpoint
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ... delete a movie from favorite movies list endpoint
  removeFavoriteMovie(MovieID: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
