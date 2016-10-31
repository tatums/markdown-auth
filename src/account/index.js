import uiRouter from 'angular-ui-router'

import config from './config'
import routes from './routes'
import AlertService from '../services/alert'
import AwsService from '../services/aws'


const component = angular.module('app.account', [uiRouter])
  .config(config)
  .config(routes)
  .service('AlertService', AlertService)
  .service('AwsService', AwsService)
  .name

export default component
