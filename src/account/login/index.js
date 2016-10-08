import uirouter from 'angular-ui-router';
import routes from './routes';
import LoginController from './controller';
import angularjwt from 'angular-jwt';
import AwsService from '../../services/aws'
import AlertService from '../../services/alert'

export default angular.module('account.login', [uirouter, angularjwt])
  .config(routes)
  .controller('LoginController', LoginController)
  .service('AwsService', AwsService)
  .service('AlertService', AlertService)
  .name;
