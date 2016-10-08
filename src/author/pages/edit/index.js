import routes from './routes'
import controller from './controller'

const component = angular.module('app.pages.edit', [])
  .config(routes)
  .controller('PagesEditController', controller)
  .name

export default component
