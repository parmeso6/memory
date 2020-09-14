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

## Database setup

Check that PostgreSQL is running

 ```bash
~$ psql -V
```

For most systems, the default Postgres user is postgres and a password is not required for authentication. Thus, to add a password, we must first login and connect as the postgres user.

```bash
~$ sudo -u postgres psql
```

With a connection now established to Postgres at the psql prompt, issue the ALTER USER command to change the password for the postgres user:

```bash
postgres=# ALTER USER postgres PASSWORD '1234';
```

If successful, Postgres will output a confirmation of ALTER ROLE.

Then, create the database 'memory'

```bash
postgres=# CREATE DATABASE memory;
```
If successful, Postgres will output a confirmation of CREATE DATABASE.

Finally, exit the psql client by using the \q command.

## Run

Install dependencies

 ```bash
 ~/memory$ cd back && npm install
 ```

Create the table

 ```bash
 ~/memory/back$ node setup
 ```

Start the NodeJS server

 ```bash
~/memory/back$ node server
 ```

Start the front in another terminal.
I use http-server in order to prevent any CORS problems

 ```bash
 ~/memory$ cd front && http-server -o --cors
 ```
