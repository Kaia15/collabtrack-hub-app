import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import fetch from "fetch";

export default class ListOfTasksComponent extends Component {
  @tracked tasks;
  @tracked show;
  @tracked showDeleteModal;
  @tracked selectedTasks;
  @tracked selectedId;
  @tracked showUpdateModal;

  constructor() {
    super(...arguments);
    this.fetchTasks();
    this.show = false;
    this.selectedTasks = [];
  }

  @action openModal(){
    this.show = true;
  }

  @action closeModal() {
    this.show = false;
  }

  @action openDeleteModal(){
    this.showDeleteModal = true;
  }

  @action closeDeleteModal() {
    this.showDeleteModal = false;
  }

  @action selectTasks(event) {
    const idx = this.selectedTasks.indexOf(event.target.value);
    if (idx > -1) {
      this.selectedTasks.splice(idx,1);
    } else this.selectedTasks.push(event.target.value);
    // console.log(this.selectedTasks);
  }

  @action selectTaskId(id) {
    this.selectedId = id;
    this.showUpdateModal = true;
    console.log(this.selectedId);
  }

  @action closeUpdateModal() {
    this.showUpdateModal = false;
  }

  async fetchTasks() {
    try {
      const response = await fetch("http://localhost:3001/api/Tasks");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      for (const task of data) {
        const {authorId } = task;
        if (authorId) {
          const res = await fetch(`http://localhost:3001/api/Authors/${authorId}`);
          const parsed = await res.json();
          task.authorName = parsed.name;
        }
      }

      this.tasks = data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }
}