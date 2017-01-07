import routes from './routes'
import controller from './controller'

const component = angular.module('app.posts.edit', [])
  .config(routes)
  .controller('PostsEditController', controller)
  .name

export default component
