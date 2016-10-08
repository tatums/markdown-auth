import routes from './routes'
import controller from './controller'

const component = angular.module('app.layouts.show', [])
  .config(routes)
  .controller('LayoutsShowController', controller)
  .name

export default component
