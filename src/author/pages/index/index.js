import uirouter from 'angular-ui-router'
import routes from './routes'
import controller from './controller'

const app = angular.module('app.pages.index', [uirouter])
  .config(routes)
  .controller('PagesController', controller)
  .name

export default app
