import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  // lifecycle hook: is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * fetch movies from FetchApiDataService
   * @returns JSON object holding all movies data
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * fetch favorite movies from FetchApiDataService
   * @returns an empty array or an array of movies favored by user
   */
  getFavorites(): void {
    this.fetchApiData.getOneUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * boolean is favorite movie
   * @param MovieID - the ID of the movie
   * @returns true or false
   */
  isFavorite(MovieID: string): boolean {
    return this.favorites.includes(MovieID);
  }

  /**
   * fetch add favorite from FetchApiDataService
   * @param MovieID - the ID of the movie
   * @returns updated favorite movies array
   */
  addToFavorites(MovieID: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 5000,
      });
      this.ngOnInit();
    });
  }

  /**
   * fetch remove favorite from FetchApiDataService
   * @param MovieID - the ID of the movie
   * @returns updated favorite movies array
   */
  removeFromFavorites(MovieID: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 5000,
      });
      this.ngOnInit();
    });
  }

  /**
   * open genre view component as dialog
   * @param genreName - the name of the genre
   * @param description - the description of the genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
   * open director view component as dialog
   * @param directorName - the name of the director
   * @param bio - the bio of the director
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '400px',
    });
  }
  /**
   * open movie details view component as dialog
   * @param title - the title of the movie
   * @param description - the descirption of the movie
   */
  openSummary(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }
}
