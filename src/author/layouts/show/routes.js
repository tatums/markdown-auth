routes.$inject = ['$stateProvider']

export default function routes($stateProvider) {
  $stateProvider
    .state('layouts.show', {
      url: '/author/layouts/:id',
      template: require('./template.html'),
      controller: 'LayoutsShowController',
      controllerAs: 'ctl',
      resolve: {
        id: function ($stateParams) {
          return $stateParams.id
        },
        item: function ($stateParams, AwsService) {
          return AwsService.layout($stateParams.id)
        }
      },
      requireLogin: true
    })
}
