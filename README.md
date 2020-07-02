# Practicing interacting with an API using fetch

A simple project to interact with the Pokemon API using JS (fetch)

## About

In this project I just access the open pokeAPI (https://pokeapi.co/) and I built a very basic front-end for it to display some information about all the different pokemon.

I wanted to get familiar with how the browser gets data from some rest API endpoints and I found this beautiful open API (I love Pokemon)

I designed some basic "cards" for the Pokemon to be displayed in which I also display the main types for that pokemon.

Everything is done using vainilla JS CSS and HTML so at the moment it's a bit limited in functionality

## How to run locally using Docker

I have been practising with Docker too so I added a Dockerfile to have the app running inside a container using an nginx image

### Steps to run

- Make sure you have Docker installed on your PC
- Clone the git repository into your PC
- Run `docker build -t pokelist-http-server:0.1 .` on the root folder, where the Dockerfile is located
- Run `docker container run -d -p 80:80 pokelist-http-server:0.1` this should start the container and allow the user to access the http server on port 80
- Visit `localhost:80/index.html` and you should see the app running on your browser :)

It's not much, but it works, and it was a great thing to practice! :D

## To Do:

- Footer
- Fix numerical ordered cards issue
- Add sorting
