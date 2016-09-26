routing.$inject = ['$stateProvider', '$urlRouterProvider', ];

export default function routing($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('account', {
      template: require('./account/base_template.html'),
    })
    .state('layouts', {
      template: require('./author/base_template.html'),
    })
  $urlRouterProvider.otherwise('/account/login');
}
