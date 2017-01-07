routes.$inject = ['$stateProvider']
export default function routes($stateProvider) {
  $stateProvider
    .state('posts.index', {
      url: '/author/posts',
      template: require('./template.html'),
      controller: 'PostsController',
      controllerAs: 'ctl',
      navItem: 'posts',
      resolve: { posts: (AwsService) => AwsService.listObjects('admin/src/posts') },
      requireLogin: true
    })
}
