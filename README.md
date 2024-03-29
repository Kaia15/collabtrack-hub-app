**Task: Create a Full-Stack Application for Managing Tasks**

**Objective:** The task is to create a full-stack application for managing tasks. This application will involve developing a RESTful API using Loopback 3 for the backend and creating a web frontend using EmberJS. The application should allow users to manage tasks, each of which is associated with an author.

**Download:** For reference, you can clone this project by running command `git clone https://github.com/Kaia15/collabtrack-hub-app.git` in your VSCode terminal.

**Demo:** [Demo(s) for this application](https://github.com/Kaia15/collabtrack-hub-app/issues/4)

**Backend: Loopback 3 REST API**

**Details:**

1. Set up a Loopback 3 project if not already done:
   - From https://loopback.io/doc/en/lb3/index.html, set up loopback-cli tools.
   - After installing cli, use `lb` to set up the application (with name, REST API, built-in models - Task & Author as following instructions).
2. Create a Loopback model named "Task" with the following properties:
   - `id` (auto-generated)
   - `title` (string)
   - `description` (string)
   - `status` (string, e.g., "todo," "in-progress," "completed")
   - `dueDate` (date)
   - `authorId` (foreign key to Author model)
3. Create a Loopback model named "Author" with the following properties:
   - `id` (auto-generated)
   - `name` (string)
4. Configure a Loopback datasource to store data in a Postgres database.
   - Use `lb model` to create loopback datasource, with v3.x, the name of datasource file will be `datasource.json`.
   - Set up database in PostgreSQL:
      + In Windows, use command prompt to create user & create database (same user, password & database declared in datasource file)
        ```
        sudo -u postgres createuser --login --pwprompt [username]
        sudo -u postgres createdb --owner=[username] [databasename]
        ```
      + Alter `[username]` to be SUPERUSER.
      + Reference: https://www3.ntu.edu.sg/home/ehchua/programming/sql/PostgreSQL_GetStarted.html
    - Put datasource field into two models: for i.e: `task.json` - {..., "datasource": "db"}, since "db" is the name of connector (given in datasource file).
    - Add `create-lb-tables.js` & run `node create-lb-tables.js` to generate necessary relations in database.
        
5. Implement CRUD operations for the "Task" and "Author" models.
   - Since loopback application (generated by loopback-cli) has built-in REST API endpoints, we can send HTTP requests without implementing.
   - However, we also can explicitly write some paths & add `remoteMethod` to implement CRUD endpoints, flexibly formatting & adding security layers. (2)
   - In `server/common/models/[filename].js`, some functions added to implement (2).
6. Set up relationships in Loopback so that an Author can have multiple Tasks, but each Task belongs to only one Author.
   - From https://loopback.io/doc/en/lb3/Define-model-relations.html, the relationship between `Task` & `Author` replicates `Review-Reviewers` in this guide.
   - Foreign key = authorId, Author: `hasMany`, Task: `belongsTo` 
7. Explore and use mixins or middleware for additional functionalities (optional).
8. Test your API using tools like Postman or curl:
   - From localhost:3001/explorer, send some requests (in the list) in Postman, (pics in issue tab: https://github.com/Kaia15/collabtrack-hub-app/issues/3).
   - https://loopback.io/doc/en/lb3/PersistedModel-REST-API.html for requests / api reference.
9. Other notes:
    Some updates (statuses) of some technologies I use:
   - Node version: 16.13.2
   - Loopback: v3.x
   - PSQL: v12.17.1
   - To run the server, command `node .`

     
**Frontend: EmberJS Web Application**

**Details:**

1. Create an EmberJS application that interacts with the Loopback 3 API.
   - Following https://guides.emberjs.com/release/tutorial/, install ember-cli & set up emberjs application.
3. Implement user interfaces to perform all CRUD operations on tasks and authors.
   - Build total 5-6 components & import states to retrieve, edit, delete & create Task & Author objects.
   - Build main layout in `templates/application.hbs` and reuse it for main page & authors page.
4. Ensure seamless integration between the EmberJS frontend and the Loopback 3 backend.
   - Use simple `fetch` & call API in `async/await` function to perform CRUD operations on Task & Author models.
5. Implement client-side validations and error handling.
6. Design a user-friendly interface with responsive design principles.
   - Referring to Flowbite built-in components & tailwind.css to build user-friendly UI.
8. Test the application thoroughly to ensure functionality and usability. 

