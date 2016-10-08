import uiRouter from 'angular-ui-router'

import login from './login'
import me from './me'
import config from './config'
import AlertService from '../services/alert'
import AwsService from '../services/aws'


const component = angular.module('app.account', [uiRouter, login, me])
  .config(config)
  .service('AlertService', AlertService)
  .service('AwsService', AwsService)
  .name

export default component
