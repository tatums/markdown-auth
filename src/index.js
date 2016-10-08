import 'angular-material/angular-material.css'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import angularAnimate from 'angular-animate'
import angularMaterial from 'angular-material'

import account from './account'
import author from './author'

import AWS from 'aws-sdk'

import config from './config'
import run from './run'

export const app = angular.module('app', [
  uiRouter,
  angularAnimate,
  angularMaterial,
  account,
  author
])
.config(config)
.run(run)
