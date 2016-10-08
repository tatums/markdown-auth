import routes from './routes'
import controller from './controller'

const component = angular.module('app.pages.index', [])
  .config(routes)
  .controller('PagesController', controller)
  .name

export default component
