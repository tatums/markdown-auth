import angular from 'angular'
import uiRouter from 'angular-ui-router'

import routes from './routes'
import controller from './controller'

const component =  angular.module('users', [uiRouter])
  .controller('UsersController', controller)
  .config(routes)
  .name

export default component
