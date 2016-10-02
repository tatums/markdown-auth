routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('pages.index', {
      url: '/author/pages',
      template: require('./template.html'),
      controller: 'PagesController',
      controllerAs: 'ctl',
      navItem: 'pages',
      resolve: {
        pages: (AwsService) => {
          return AwsService.listObjects('admin/src')
        }
      },
      requireLogin: true
    })
}
