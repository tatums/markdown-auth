routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
  $stateProvider
    .state('layouts', {
      template: require('./base_template.html'),
    })
    .state('pages', {
      template: require('./base_template.html'),
    })
}
