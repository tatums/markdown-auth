import uirouter from 'angular-ui-router';
import routes from './routes';
import MyAccountController from './controller';
import AwsService from '../../services/aws'

export default angular.module('app.myAccount', [uirouter])
  .config(routes)
  .controller('MyAccountController', MyAccountController)
  .service('AwsService', AwsService)
  .name;
