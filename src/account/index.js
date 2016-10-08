import angular from 'angular'
import uiRouter from 'angular-ui-router'

import login from './login'
import me from './me'
import config from './config'


export default angular.module('account', [uiRouter, login, me])
  .config(config)
  .name
