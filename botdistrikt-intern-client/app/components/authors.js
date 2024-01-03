import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';

export default class AuthorsComponent extends Component {
  @tracked allAuthors;
  @tracked selectedAuthors;
  @tracked selectedAuthorId;
  @tracked openDeleteModal;

  constructor() {
    super(...arguments);
    this.fetchAuthors();
    this.selectedAuthors = [];
  }

  @action selectAuthors(event) {
    const idx = this.selectedAuthors.indexOf(event.target.value);
    if (idx > -1) {
      this.selectedAuthors.splice(idx, 1);
    } else this.selectedAuthors.push(event.target.value);
    // console.log(this.selectedTasks);
  }

  @action removeAuthorId(id) {
    this.selectedAuthorId = id;
    // this.showUpdateModal = true;
    // console.log(this.selectedAuthorId);
    this.openDelete();
  }

  @action editAuthorId(id) {
    this.selectedAuthorId = id;
    // this.showUpdateModal = true;
    // console.log(this.selectedAuthorId);
    // this.open();
  }

  openDelete() {
    this.openDeleteModal = true;
  }

  @action closeDelete() {
    this.openDeleteModal = false;
  }

  @action async deleteAuthor() {
    // console.log('a');
    try {
        const belongedTasks = await fetch(`http://localhost:3001/api/Authors/${this.selectedAuthorId}/tasks`);
        const parsed_tasks = await belongedTasks.json();
        for (let task of parsed_tasks) {
            if (task['status'] !== 'done') task['authorId'] = null;
        }
        const deleted = await fetch(`http://localhost:3001/api/Authors/${this.selectedAuthorId}`, {method: 'DELETE'});
        const parsed = await deleted.json();
        console.log(parsed);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    } catch (err) {
        console.log(err);
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
      for (let author of data) {
        const fetchedTasks = await fetch(
          `http://localhost:3001/api/Authors/${author.id}/tasks`,
        );
        const parsed = await fetchedTasks.json();
        author['tasks'] = parsed;
      }
      this.allAuthors = data;
      console.log(this.allAuthors);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }
}
