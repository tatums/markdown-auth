import routes from './routes'
import LoginController from './controller'
import angularjwt from 'angular-jwt'

const component = angular.module('app.account.login', [angularjwt])
  .config(routes)
  .controller('LoginController', LoginController)
  .name

export default component
