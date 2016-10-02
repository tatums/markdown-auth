routes.$inject = ['$stateProvider']

export default function routes($stateProvider) {
  $stateProvider
    .state('layouts.show', {
      url: '/author/layouts/:id',
      template: require('./template.html'),
      controller: 'LayoutsShowController',
      controllerAs: 'ctl',
      navItem: 'layouts',
      resolve: {
        id: ($stateParams) => {
          return $stateParams.id
        },
        item: ($stateParams, AwsService) => {
          return AwsService.getObject($stateParams.id)
        }
      },
      requireLogin: true
    })
}
