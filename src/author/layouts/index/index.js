import uirouter from 'angular-ui-router'
import routes from './routes'
import LayoutsController from './controller'
import AwsService from '../../../services/aws'

export default angular.module('app.layouts.index', [uirouter])
  .config(routes)
  .controller('LayoutsController', LayoutsController)
  .name
