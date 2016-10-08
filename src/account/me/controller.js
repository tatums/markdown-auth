export default class controller {

  constructor(AwsService, $mdToast, $state) {
    this.AwsService = AwsService
    this.mdToast = $mdToast
    this.state = $state
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()

    this.displayAlert = (message) => {
      this.mdToast.show(
        this.mdToast.simple()
        .textContent(message)
        .position("bottom")
        .hideDelay(4000)
      )
    }
    this.signout = () => {
      AwsService.signout()
      $state.go('account.login')
    }
  }

  changePassword(form, validity) {
    this.AwsService.cognitoUser()
    .then(user => {
      return this.AwsService.changePassword(user, form.currentPassword, form.password, form.passwordConfirmation)
    })
    .then(resp => {
      this.displayAlert("Success! Your password has been changed.")
      this.state.go('layouts.index')
    })
    .catch(err => {
      console.log(err)
      this.displayAlert(err.message)
    })
  }
}

controller.$inject = ['AwsService', '$mdToast', '$state']
