import uiRouter from 'angular-ui-router'

import LayoutsIndex from './layouts/index'
import LayoutsEdit from './layouts/edit'
import PagesIndex from './pages/index'
import PagesEdit from './pages/edit'

import config from './config'

// not supported by es6
//import 'ace-builds/src-min-noconflict/ace.js'
//import 'ace-builds/src-min-noconflict/mode-html.js'
//import 'ace-builds/src-min-noconflict/worker-html.js'
import 'angular-ui-ace'
import './style.css'

const component = angular.module('author',
  [uiRouter, LayoutsIndex, LayoutsEdit, PagesIndex, PagesEdit, 'ui.ace'])
  .config(config)
  .name

export default component
