import angular from 'angular'
import uiRouter from 'angular-ui-router'

import routes from './routes'
import controller from './controller'

export default angular.module('users', [uiRouter])
  .controller('UsersController', controller)
  .config(routes)
  .name
