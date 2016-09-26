routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('layouts.index', {
      url: '/author/layouts',
      template: require('./template.html'),
      controller: 'LayoutsController',
      controllerAs: 'ctl',
      resolve: {
        items: function(AwsService) {
          return AwsService.layouts()
        }
      },
      requireLogin: true
    })
}
