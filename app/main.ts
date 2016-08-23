import app from './components/app/app';
import calendar from './components/calendar/calendar';
import { module, bootstrap } from 'angular';

module('blvd', [
  app.name,
  calendar.name
]);

bootstrap(document, ['blvd']);
