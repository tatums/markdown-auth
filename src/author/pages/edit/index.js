import uirouter from 'angular-ui-router'
import routes from './routes'
import controller from './controller'

const app = angular.module('app.pages.edit', [uirouter])
  .config(routes)
  .controller('PagesEditController', controller)
  .name

export default app
