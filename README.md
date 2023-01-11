## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This is just my generic static portfolio website ([jakubjanowski.com](https://jakubjanowski.com)).

## Technologies

The website is written using:

- Nunjucks,
- Sass.

The following tools are used for compilation:

- eleventy (version: 0.11.0),
- gulp (version: 4.0.2).

## Setup

This project runs on node version 18 and npm version 8. Execute the following commands from your command line:

```
# Clone this repository
$ git clone https://github.com/jakubjanowski/jakubjanowski.github.io

# Go into the repository
$ cd jakubjanowski.github.io

# Install dependencies
$ npm i

# Compile the files
$ npm run dev

# Start the server
$ npm start
```

The website files will be generated in `dist/` directory and the server will host the website at `localhost:8080`.
