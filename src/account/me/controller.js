export default class LoginController {
  constructor(AwsService, $state) {
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()
    this.signout = () => {
      AwsService.signout()
      $state.go('account.login')
    }
  }
}

LoginController.$inject = ['AwsService', '$state']
