import routes from './routes'
import MeController from './controller'

const component = angular.module('app.account.me', [])
  .config(routes)
  // TODO rename this MeController
  .controller('MyAccountController', MeController)
  .name

export default component
