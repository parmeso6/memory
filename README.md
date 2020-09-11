# Memory

Memory is a little game to show O'Clock team I can code.

In fact, it's not a little game, it's two projects:

- a frontend project in HTML/CSS/JS
- a backend project in NodeJS and PostgreSQL

## Installation

Memory requires the following to run:

- [Node.js][node] 10.22+
- [npm][npm] (normally comes with Node.js)
- [PostgreSQL][postgresql]
- [http-server][http-server]

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[postgresql]: https://www.postgresql.org/download/
[http-server]: https://www.npmjs.com/package/http-server

## Run

Check that PostgreSQL is running

 ```bash
psql -V
```

If your server is a Linux, input the command service postgresql status. Be sure to exit properly by typing CTRL + C when you’re finished.

Install dependencies

 ```bash
 cd back & npm install
 ```

Start the NodeJS server

 ```bash
node app.js
 ```

Start the front in another terminal.
I use http-server in order to prevent any CORS problems

 ```bash
 cd front & http-server -o --cors
 ```
