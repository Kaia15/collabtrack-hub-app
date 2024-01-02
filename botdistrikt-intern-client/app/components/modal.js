import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';

export default class ModalComponent extends Component {
    @tracked deletedTasks;

    constructor() {
        super(...arguments);
        this.deletedTasks = this.args.state;
    }

    @action close() {
        this.args.onchange();
    }

    @action async deleteTasks() {
        for (const id of this.deletedTasks) {
            const deleted = await fetch(`http://localhost:3001/api/tasks/${id}`, {method: 'DELETE'});
            const parsed = await deleted.json();
            console.log(parsed);
        }
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }
}