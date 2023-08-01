# filmflix Angular client

## Objective

filmflix is an app for movie lovers who want to access information about movies and, once signed in, be able to view and update their profile information. The app has been built as the client-side to the [RESTful Movie API](https://github.com/tessa-tum/filmflix-api).

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

Deployed app can be found [here](https://tessa-tum.github.io/filmflix-Angular-client/welcome) :sparkles:

## Visuals

Desktop view of home page

![UI Screenshot 1](https://github.com/tessa-tum/filmflix-Angular-client/blob/main/src/assets/filmflix-angular-ui-1.PNG)

Desktop view of profile page

![UI Screenshot 2](https://github.com/tessa-tum/filmflix-Angular-client/blob/main/src/assets/filmflix-angular-ui-2.PNG)

## Built with

### Languages

- TypeScript
- HTML
- SCSS

### Framework, Libraries, Tools

- Angular
- Angular Material
- Angular CLI
- Angular Router
- Typedoc for documentation
- Hosted on gh-pages

### Global Dependencies
- `@angular/cli`

### Dependencies
- `@angular/...` and all the packages that come with it
- `rxjs` 
- `tslib` 
- `zone.js` 

## Features

- Welcome View, where users will be able to either sign up or log in
- User Profile View, where users will be able to view / edit their profile
- Movie View, showing all movies once the user is authenticated
- Movie Card Component that has buttons to - on click - open
    - a dialogue with details about the Movie Genre
    - a dialogue with details about the Director
    - a dialogue with details about the Movie
    - as well as a (toggle) button to add/remove from favorite
- Angular Router implemented to enable change between Welcome View, Movie View and Profile View

## How to run

- clone the repo
- `cd` into project
- `npm install`
- `ng serve` - automatically rebuilds the application and reloads the page when you change any of the source files
- `ng serve --open` - automatically rebuilds the application and reloads the page when you change any of the source files and opens the application in a new tab in your browser `http://localhost:4200/`

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.