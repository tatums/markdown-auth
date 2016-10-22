import uiRouter from 'angular-ui-router'

import LayoutsIndex from './layouts/index'
import LayoutsShow from './layouts/show'
import LayoutsEdit from './layouts/edit'
import PagesIndex from './pages/index'
import PagesEdit from './pages/edit'

import config from './config'

// not supported by es6
import 'angular-ui-ace'
import './style.css'

const component = angular.module('author',
  [uiRouter, LayoutsIndex, LayoutsShow, LayoutsEdit, PagesIndex, PagesEdit, 'ui.ace'])
  .config(config)
  .name

export default component
