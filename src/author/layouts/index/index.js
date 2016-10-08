import routes from './routes'
import LayoutsController from './controller'

const component = angular.module('app.layouts.index', [])
  .config(routes)
  .controller('LayoutsController', LayoutsController)
  .name

export default component
