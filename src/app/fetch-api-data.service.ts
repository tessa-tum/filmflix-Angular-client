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

  /**
   * registers a user by sending their details to the API
   * @param userDetails - the details of the user to register
   * @returns an object holding user data
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * logs a user in
   * @param userDetails - the details of the user to register
   * @returns an object holding user data
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * get all movies from the API
   * @returns an object holding all movies data
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get a movie by title
   * @param title - the title of the movie
   * @returns an object holding data of one movie
   */
  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/title/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get a movie by ID
   * @param MovieID - the ID of the movie
   * @returns an object holding data of one movie
   */
  getMovieById(MovieID: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get a director by name
   * @param directorName - the name of the director
   * @returns an object holding data of one director
   */
  getOneDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get a genre by name
   * @param genreName - the name of the genre
   * @returns an object holding data of one genre
   */
  getOneGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get a specific user by username
   * @returns an object holding data of one user
   */
  getOneUser(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get favorite movies of one user
   * @returns  an object holding user's favorite movies
   */
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
          return data.FavoriteMovies;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * add a favorite movie to favorite movies list
   * @param MovieID - the ID of the movie
   * @returns an object holding user's favorite movies including newly added movie(s)
   */
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

  isFavoriteMovie(MovieID: string): boolean {
    return user.FavoriteMovies.indexOf(MovieID) >= 0;
  }

  /**
   * update user by username
   * @param updatedUser - the updated user
   * @returns an object holding updated data of one user
   */
  updateUser(updatedUser: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete a user by username
   * @returns a message and redirects to welcome page
   */
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete a favorite movie from favorite movies list
   * @param MovieID - the ID of the movie
   * @returns an object holding data of user's favorite movies
   */
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
