routes.$inject = ['$stateProvider']

import LoginController from './controllers/login'
import myAccountController from './controllers/my_account'
import forgotPasswordController from './controllers/forgot'
import claimController from './controllers/claim'

export default function routes($stateProvider) {
  $stateProvider
    .state('account.login', {
      url: '/account/login',
      template: require('./views/login.html'),
      controller: LoginController,
      controllerAs: 'login',
      requireLogin: false
    })
    .state('account.myAccount', {
      url: '/account/me',
      template: require('./views/my_account.html'),
      controller: myAccountController,
      controllerAs: 'myAccount',
      navItem: 'me',
      requireLogin: true
    })
    .state('account.forgot', {
      url: '/account/forgot',
      template: require('./views/forgot.html'),
      controller: forgotPasswordController,
      controllerAs: 'ctl',
      requireLogin: false
    })
    .state('account.claim', {
      url: '/account/forgot/claim',
      template: require('./views/claim.html'),
      controller: claimController,
      controllerAs: 'ctl',
      requireLogin: false
    })
}
