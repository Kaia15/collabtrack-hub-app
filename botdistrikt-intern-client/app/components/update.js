import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';

export default class UpdateComponent extends Component {
  @tracked currentTask;
  @tracked authors;
  @tracked author;
  @tracked taskId;

  constructor() {
    super(...arguments);
    this.taskId = this.args.state;
    this.fetchCurrentTask(this.taskId);
    // this.fetchCurrentDraft();
    // this.fetchAuthors();
  }

  async fetchCurrentTask(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/Tasks/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      // for (const author of data) {
      //   console.log(typeof author.id);
      // }
      const { authorId } = data;
      if (authorId !== null) {
        const author = await fetch(
          `http://localhost:3001/api/Authors/${authorId}`,
        );
        const parsed = await author.json();
        data['author'] = parsed;
      }
      const authors = await fetch(`http://localhost:3001/api/Authors`);
      const authors_data = await authors.json();
      // console.log(data);
      this.currentTask = data;
      if (authorId)
        this.authors = authors_data.filter((author) => author.id != authorId);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }
  async fetchAuthors() {
    // const id = 1;
    try {
      const response = await fetch(`http://localhost:3001/api/Authors`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      // for (const author of data) {
      //   console.log(typeof author.id);
      // }
      // console.log(data);
      if (this.taskId)
        this.authors = data.filter((author) => author.id != this.taskId);
      console.log(this.authors);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }
  @action close() {
    this.args.onchange();
  }

  @action handleAuthor(event) {
    this.author = event.target.value;
    console.log(this.author);
  }
  @action async updateTask(event) {
    event.preventDefault();
    try {
      const { title, description, status, dueDate } = event.target.elements;
      let data = {
        title: title.value,
        description: description.value,
        status: status.value,
        authorId: this.author,
        dueDate: dueDate.value,
      };
      console.log(data);
      // console.log(this.title);
      const response = await fetch(
        `http://localhost:3001/api/Tasks/${this.taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      data = await response.json();
      this.task = data;
      console.log(this.task);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }
}
