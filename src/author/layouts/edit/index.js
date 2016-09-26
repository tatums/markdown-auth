import uirouter from 'angular-ui-router'
import routes from './routes'
import controller from './controller'
import AwsService from '../../../services/aws'

export default angular.module('app.layouts.edit', [uirouter])
  .config(routes)
  .controller('LayoutsEditController', controller)
  .name
