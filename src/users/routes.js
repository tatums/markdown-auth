routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
  $stateProvider
    .state('users', {
      template: require('./../base_template.html'),
    })
    .state('users.index', {
      url: '/users',
      template: '<h2>Users</h2>',
      controller: 'UsersController',
      controllerAs: 'users',
      navItem: 'users',
      requireLogin: false
    })
}
