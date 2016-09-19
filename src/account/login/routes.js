routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('account.login', {
      url: '/account/login',
      template: require('./template.html'),
      controller: 'LoginController',
      controllerAs: 'login',
      authenticate: false
    });
}
