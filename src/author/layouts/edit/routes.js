routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('layouts.edit', {
      url: '/author/layouts/:id/edit',
      template: require('./template.html'),
      controller: 'LayoutsEditController',
      controllerAs: 'ctl',
      navItem: 'layouts',
      resolve: {
        id: ($stateParams) => {
          return $stateParams.id
        },
        item: ($stateParams, AwsService) => {
          return AwsService.layout($stateParams.id)
        }
      },
      requireLogin: true
    })
}
