import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import fetch from "fetch";

export default class NavComponent extends Component {
    // @tracked author;
    @tracked openModal;

    @action openAuthorModal() {
        this.openModal = true;
    }

    @action closeAuthorModal() {
        this.openModal = false;
    }
}