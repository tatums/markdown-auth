import 'angular-material/angular-material.css'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import angularAnimate from 'angular-animate'
import angularMaterial from 'angular-material'

import accountLogin from './account/login'
import accountMe from './account/me'
import authorLayoutsIndex from './author/layouts/index'
import authorLayoutsShow from './author/layouts/show'
import authorLayoutsEdit from './author/layouts/edit'
import authorPagesIndex from './author/pages/index'
import authorPagesEdit from './author/pages/edit'

import config from './config'
import run from './run'

export const app = angular.module('app', [
  uiRouter,
  angularAnimate,
  angularMaterial,
  accountLogin,
  accountMe,
  authorLayoutsIndex,
  authorLayoutsShow,
  authorLayoutsEdit,
  authorPagesIndex,
  authorPagesEdit,
])
.config(config)
.run(run)
