import angular from 'angular'
import uiRouter from 'angular-ui-router'

import LayoutsIndex from './layouts/index'
import LayoutsShow from './layouts/show'
import LayoutsEdit from './layouts/edit'
import PagesIndex from './pages/index'
import PagesEdit from './pages/edit'

import config from './config'

export default angular.module('author', [uiRouter,
  LayoutsIndex,
  LayoutsShow,
  LayoutsEdit,
  PagesIndex,
  PagesEdit
])
  .config(config)
  .name
