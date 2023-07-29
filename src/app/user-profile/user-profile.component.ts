import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getOneUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      // this.user.Birthday comes in as ISOString format, like so: "2011-10-05T14:48:00.000Z"
      this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
    });
  }

  updateUserInfo(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((result) => {
      if (this.user.Username !== result.Username || this.user.Password !== result.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Credentials updated! Please login using your new credentials',
          'OK',
          {
            duration: 5000,
          }
        );
      }
      else {
        this.snackBar.open(
          'User information has been updated!',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    });
  }

  deleteAccount(): void {
    if (confirm('All your data will be lost. Make sure you want to continue')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'User account has been deleted!',
          'OK',
          {
            duration: 5000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}