routing.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider' ];

export default function routing($stateProvider, $urlRouterProvider, $mdThemingProvider) {

 $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')

  $urlRouterProvider.otherwise('/account/login');
}
