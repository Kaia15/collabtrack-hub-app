import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';

export default class TaskComponent extends Component {
  @tracked title;
  @tracked task;
  @tracked description;
  @tracked status;
  @tracked authors;
  @tracked author;

  constructor() {
    super(...arguments);
    // this.fetchTasks();
    this.title = '';
    this.description = '';
    this.status = '';
    this.fetchAuthors();
  }

  async fetchAuthors() {
    try {
      const response = await fetch('http://localhost:3001/api/Authors');

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      for (const author of data) {
        console.log(typeof author.id);
      }
      this.authors = data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }

  @action async postTask(event) {
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
      const response = await fetch('http://localhost:3001/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      data = await response.json();
      this.task = data;
      console.log(this.task);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }

  @action handleAuthor(event) {
    this.author = event.target.value;
    console.log(this.author);
  }

  @action close() {
    this.args.onchange();
  }
}
