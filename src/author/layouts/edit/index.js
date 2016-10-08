import routes from './routes'
import controller from './controller'

const component = angular.module('app.layouts.edit', [])
  .config(routes)
  .controller('LayoutsEditController', controller)
  .name
export default component
