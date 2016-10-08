routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
  $stateProvider
    .state('account', {
      template: require('./base_template.html'),
    })
}
