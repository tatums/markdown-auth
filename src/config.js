routing.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider' ];

export default function routing($stateProvider, $urlRouterProvider, $mdThemingProvider) {

 $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')

  $stateProvider
    .state('account', {
      template: require('./account/base_template.html'),
    })
    .state('layouts', {
      template: require('./author/base_template.html'),
    })
    .state('pages', {
      template: require('./author/base_template.html'),
    })
  $urlRouterProvider.otherwise('/account/login');
}
