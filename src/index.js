import 'angular-material/angular-material.css'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import angularAnimate from 'angular-animate'
import angularMaterial from 'angular-material'

import login from './account/login'
import myAccount from './account/me'

import config from './config'
import run from './run'

export const app = angular.module('app', [
  uiRouter,
  login,
  myAccount,
  angularAnimate,
  angularMaterial,
])
.config(config)
.run(run)
