import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';

export default class MainComponent extends Component {
  constructor() {
    super(...arguments);
    console.log(this.args.onchange);
  }
  @action closeModal() {
    this.args.onchange();
  }

  @action async postAuthor(event) {
    event.preventDefault();
    try {
      const { name } = event.target.elements;
      let data = { name: name.value };
      console.log(data);
      const response = await fetch('http://localhost:3001/api/Authors', {
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
      // this.author = data;
      setTimeout(() => {
        window.location.href = 'http://localhost:4200/';
      }, 1000);
    } catch (err) {
      console.error('Error fetching data:', error);
    }
  }
}
