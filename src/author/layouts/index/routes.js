routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('layouts.index', {
      url: '/author/layouts',
      template: require('./template.html'),
      controller: 'LayoutsController',
      controllerAs: 'ctl',
      navItem: 'layouts',
      resolve: {
        items: (AwsService) => {
          return AwsService.listObjects('admin/layouts')
        }
      },
      requireLogin: true
    })
}
