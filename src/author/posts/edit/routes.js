routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('posts.edit', {
      url: '/author/posts/:id/edit',
      template: require('./template.html'),
      controller: 'PostsEditController',
      controllerAs: 'ctl',
      navItem: 'posts',
      resolve: {
        id: function ($stateParams) {
          return $stateParams.id
        },
        post: ($stateParams, AwsService) => {
          return AwsService.getObject($stateParams.id)
        }
      },
      requireLogin: true
    })
}
