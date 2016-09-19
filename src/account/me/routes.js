routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('account.myAccount', {
      url: '/account/me',
      template: require('./template.html'),
      controller: 'MyAccountController',
      controllerAs: 'myAccount',
      authenticate: true
    });
}
