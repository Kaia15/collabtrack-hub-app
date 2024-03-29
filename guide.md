**Task: Create a Full-Stack Application for Managing Tasks**

**Objective:** Your task is to create a full-stack application for managing tasks. This application will involve developing a RESTful API using Loopback 3 for the backend and creating a web frontend using EmberJS. The application should allow users to manage tasks, each of which is associated with an author.

**Backend: Loopback 3 REST API**

**Requirements:**

1. Set up a Loopback 3 project if not already done.
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
5. Implement CRUD operations for the "Task" and "Author" models.
6. Set up relationships in Loopback so that an Author can have multiple Tasks, but each Task belongs to only one Author.
7. Explore and use mixins or middleware for additional functionalities (optional).
8. Test your API using tools like Postman or curl.
9. Provide setup and run instructions for your Loopback 3 project.

**Frontend: EmberJS Web Application**

**Requirements:**

1. Create an EmberJS application that interacts with the Loopback 3 API.
2. Implement user interfaces to perform all CRUD operations on tasks and authors.
3. Ensure seamless integration between the EmberJS frontend and the Loopback 3 backend.
4. Implement client-side validations and error handling.
5. Design a user-friendly interface with responsive design principles.
6. Test the application thoroughly to ensure functionality and usability.
7. Document setup and usage instructions in your project's README.md.

**Submission:**

- **Minimum Requirement:** Share your project's codebase via a GitHub repository.
- **Recommended Requirement:** Optionally, deploy your application on a server like Vercel, Heroku, Glitch, GCP, or AWS, and make it accessible via the internet.
- Include a README.md file with detailed instructions on setting up and running the project, both for the backend and the frontend.

**Notes:**

- Please use Loopback 3, even though it has reached LTS status. We plan to switch to Loopback 4 or another framework in the future, but for now we are on Loopback 3
- You may be required to use NodeJS v12 or v16 for the task. Please specify the engine version in your package.json
