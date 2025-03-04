# WhatToWatch

## Elevator Pitch

Have you ever had a night when you wanted to watch a movie, but you didn't know what you wanted to watch? You have so many streaming services, and so many movies to choose! Well, this website will help you decide on what _you_ want to watch.

Select your streaming service(s) of choice, and then "like" or "dislike" certain movies. The website will help figure out what kinds of movies you like, and then offer suggestions! If you set up a "group movie night", the website can filter all of your preferences together to help decide on what movie you all would like! Date night? No problem! The website can have a preference towards romances. ;)

## Representing Technologies

**HTML** - Uses correct HTML structure for application. Five, maybe Six, HTML pages. The Login/Signup, Dashboard, Movie Recommendation, Setting up a group, and rating a film. Possibly also including a settings page where user can define favorite genres, and also also acceptable ratings.

**CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

**JavaScript** - Provides login, applying preferences, backend endpoint calls, deciding on ultimate movie choice.

**React** - Multi page application with views componentized and reactive to user's actions.

**Service** - Backend service with endpoints for:

- retrieving preferences
- retrieving group information
- getting movie information and posters from the [TMBD Service](developer.themoviedb.org).

**DB/Login** - Store users, choices, and votes in database. Register and login users. Credentials securely stored in database. Can't make an account unless authenticated.

**WebSocket** - Once movie group is made, the movie choices are broadcast to all other users.

## Mock Images

![1 - Dash](https://github.com/user-attachments/assets/effcdabe-26f0-4bcd-859b-51fb7ae99704)

![2 - Movie Rec](https://github.com/user-attachments/assets/9e867d01-f45c-41ae-aa1e-4ec06fc62e83)

![3 - Set Up Group](https://github.com/user-attachments/assets/7a7801f9-f0a0-4f95-ad1e-1e462651485d)

![4 - Film Rating](https://github.com/user-attachments/assets/42a161d9-45b1-4176-8a20-83c2d7e236ff)

![5 - Film Rating Info](https://github.com/user-attachments/assets/5a0007b0-f76d-4f79-b544-ef9266c98de7)

## Startup - 01/28/25

I made my mock-up of the website, including HTML, SCSS, and basic page funcitonality. I still need to update with better page responsive CSS, but overall I am pretty pleased with my progress so far.

## CSS - 02/04/25

Added better page-responsive SCSS, mkaing the images bigger on smaller screens as well as changing the flex-direction of each item so that on smaller screens the direction is a column instead of a row.

## React - 02/10/25

Converted to React, also added functional contact menu on About page, and login. (The user is "admin" and the password is "password" until authentication is finished.)

## React (2) - 02/26/25

Converted many pages to React Components, supplied dummy data for API call functions, using React State to save information across pages (Movie Ratings, User Information, etc.)
