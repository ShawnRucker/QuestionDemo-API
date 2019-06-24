# QuestionDemo-API
The QuestionDemo-API is the API interface used for the QuestionDemo React application.  The application itself is written in native Node.js using Express.  The back end is a [PostgreSQL](https://www.postgresql.org/)  database running through [Sequelize](http://docs.sequelizejs.com/).

## Setting Up The Database
The database will automatically populate itself.  All you need to provide is a blank database along with usable credentials :)

Once you have cloned the repository and created a blank databases.  Most likely using pgAdmin.  You will need to modify the "config/config.json" file to match the credentials you have just assigned to the database.

```node.js
{
  "development": {
    "username": "YourUserName",
    "password": "YourPassword",
    "database": "YourDatabase",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
```
Once this is done you will need to run two commands to build out the datbase structure and populate the example data.  The example database comes with 12 Question Groups and 32400 Example Questions.

```
node buildDatabase.js
```
