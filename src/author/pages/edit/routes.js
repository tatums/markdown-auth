routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('pages.edit', {
      url: '/author/pages/:id/edit',
      template: require('./template.html'),
      controller: 'PagesEditController',
      controllerAs: 'ctl',
      navItem: 'pages',
      resolve: {
        id: function ($stateParams) {
          return $stateParams.id
        },
        page: ($stateParams, AwsService) => {
          return AwsService.getObject($stateParams.id)
        }
      },
      requireLogin: true
    })
}
