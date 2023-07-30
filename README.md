# filmflix Angular client

## Objective

filmflix is an app for movie lovers who want to access information about movies and, once signed in, be able to view and update their profile information.
The app has been built as the client-side to the [RESTful Movie API](https://github.com/tessa-tum/filmflix-api).
<br>
The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

Deployed app: https://tessa-tum.github.io/filmflix-Angular-client/welcome

## Interface

![UI Screenshot 1](https://github.com/tessa-tum/filmflix-Angular-client/blob/main/src/assets/filmflix-angular-ui-1.PNG)
![UI Screenshot 2](https://github.com/tessa-tum/filmflix-Angular-client/blob/main/src/assets/filmflix-angular-ui-2.PNG)

## Features

The app must
- have a Welcome View, where users will be able to either sign up or log in
- have a User Profile View, where users will be able to view / edit their profile
- have a Movie View, showing all movies once the user is authenticated
- have a Movie Card Component
  - this component will be rendered ñ time on the Movie View, depending on the amount of movies present in the database
  - the component will have buttons to - on click - open
    - a dialogue with details about the Movie Genre
    - a dialogue with details about the Director
    - a dialogue with details about the Movie
    - as well as a (toggle) button to add/remove from favorite
- have Angular Router implemented to enable change between Welcome View, Movie View and Profile View

## Languages, Libraries Frameworks

- Angular, Angular Material
- TypeScript
- HTML
- SCSS

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
