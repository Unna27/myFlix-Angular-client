# MyFlixApp
> Using Angular, build the client side of myFlix application. It fetches data from Rest API and database
> Live demo  https://unna27.github.io/myFlix-Angular-client/welcome

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
- This application provides information about different movies.
- It allows users to login to their profile and update their favorite Movies list.


## Technologies Used
- Typescript
- Javascript
- HTML
- CSS


## Features
Home page
* Returns a list of all movies to the user (each listed item with an image, and title and a link to view full description of the movie)
* filters movie list by title
* Allows users to add a movie to their list of favorites

Login view
* Allows users to log in with a username and password

Registration view
* Allows new users to register (username, password, email, birthday)

Genre view
* Returns data about a genre, with a name and description
* Displays similar genre movies 

Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays movies created by the same director

Profile view
* Allows users to update their user info ( email, date of birth)
* Allows existing users to deregister
* Displays their favorite movies
* Allows users to remove a movie from their list of favorites


## Screenshots
Home Page:

![Movies](https://user-images.githubusercontent.com/58221568/154762398-0e587386-02a2-4c17-bbef-a850189183bf.png)

Profile View:

![Profile](https://user-images.githubusercontent.com/58221568/154762407-de9236bc-aa75-46a3-be39-4b47165adf65.png)

## Setup

Technical Requirements:

- The application must be written in Angular (version 9 or later)
- The application requires the latest version of Node.js and npm package
- The application must contain user registration and login forms
- The application must be designed using Angular Material
- The application's codebase must contain comments using Typedoc
- The project must contain technical documentation using JSDoc
- The project must be hosted on GitHub Pages


## Usage

Clone the repository:

gh repo clone Unna27/myFlix-Angular-Client

Naviagte to myFlix-Angular-Client directory, install the project dependencies:

npm install

Start up the server:

ng serve

The app will automatically reload if you change any of the source files.

## Project Status
Project is: _in review_


## Room for Improvement

To do:
- Allow users to filter and sort movies


## Acknowledgements
- This project was based on the CareerFoundry tutorial (https://careerfoundry.com/en/courses/become-a-web-developer/)
- Many thanks to my Mentor (Renish Bhaskaran) and my Tutor (Blaise Bakundukize) for offering me timely feedback and support to shape my project.


## Contact
Created by Unnamalai Ramanathan (https://unnamalairamanathan.com/) - feel free to contact me!

