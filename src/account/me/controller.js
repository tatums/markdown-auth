export default class controller {
  constructor(AwsService, $state) {
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()
    this.signout = () => {
      AwsService.signout()
      $state.go('account.login')
    }
  }
}

controller.$inject = ['AwsService', '$state']
