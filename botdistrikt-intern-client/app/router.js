import EmberRouter from '@ember/routing/router';
import config from 'botdistrikt-intern-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  // this.route('tasks');
  // this.route('form');
  // this.route('update');
  // this.route('main');
  this.route('authors');
});