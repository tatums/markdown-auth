import uirouter from 'angular-ui-router'
import routes from './routes'
import controller from './controller'

export default angular.module('app.layouts.show', [uirouter])
  .config(routes)
  .controller('LayoutsShowController', controller)
  .name
