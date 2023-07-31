import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

  /**
   * navigate to '/movies'
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigate to '/profile'
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * log out, clear localStorage, navigate to '/welcome'
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
