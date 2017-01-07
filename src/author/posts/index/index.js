import routes from './routes'
import controller from './controller'

const component = angular.module('app.posts.index', [])
  .config(routes)
  .controller('PostsController', controller)
  .name

export default component
