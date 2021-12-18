# A Media Site

url: https://next-class.surge.sh/

Built with with API requests through RapidApi.

Genius (Song data): https://rapidapi.com/brianiswu/api/genius/

IMDb (Movie/Show data): https://rapidapi.com/apidojo/api/imdb8/

<hr>

## Purpose

The goal of this web application is to create a search tool for specific media types. While popular search engines like Google/Bing/etc. return a list of anything on the internet that has relevance to a query, this media site has a focus on songs, shows, and movies. With one search you can find lists of all three media types with more information on each one on command.

Users can sign in to be able to save their query history, allowing for searches based on terms used before.

<hr>

## Features

The site features a a search bar that can be submitted to send a request to the backend. This backend then searches for hits on the query between the two APIs, getting three different media type results in the form of their IDs from their respective API. These IDs are then referenced to the applications database to see if the media item has already been returned before (i.e. the information is already in the database, and is not needed to be fetched from the API manually). If the item is found in the database, the backend grabs the information from there. Otherwise, it will query the API again with the ID of a item that needs more information, which will get a response of that information. The data is then sent to the front end to be displayed.

The reasoning for saving results is to create faster searches in the future. Without needing to query each title for the information needed, and instead just pulling it out from the saved database saves seconds on each search.

Features included in signing up/loggin in include being able to update a user's information, as well as get a glimpse of top hits on each previous query the user has made.

<hr>

## Tests

Testing for this site is in the folder labeled accordingly and can be run using` npm run.`

<hr>

## User Flow

A user will first see a serachbar upon arriving at the site. Upon populating the search bar and submitting a search, the results screen will appear after a brief load (loading spinner is put in place of webpage to let users know the site is working). These results are broken up into three categories based on their media type (movies, shows, songs). The result page also has a search bar that can be hidden or shown with a toggler.

At this results screen, any of the "posters" can be clicked to get to a solo page of that item that shows more information. There is a button to go back from this page as well.

The navbar is located at the top of the page, and contains a search bar as well to allow for searching from anywhere on the site. Upon using that bar, it redirects you to the search page again.

If logged out, the navbar shows options for home, login, and signup. If logged in, the navbar will instead show home, profile, and logout.

Upon going to the user profile, you are given a form to optionally update user information including first name, last name, and password (old password is required to confirm changes).

Below the form is the user history data. This data is stored in the form of cards. Each card has the query itself on top, and three rows of posters below, each row representing the top three hits of each media type.

<hr>

## Technology Stack

The technology stack used is:  
-ReactJS  
-NodeJS (using express)  
-PostgreSQL
