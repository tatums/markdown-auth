export default class controller {

  constructor(AwsService, AlertService, $state) {
    this.AwsService = AwsService
    this.AlertService = AlertService
    this.state = $state
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()

    this.signout = () => {
      AwsService.signout()
      this.state.go('account.login')
    }
  }

  changePassword(form, validity) {
    this.AwsService.cognitoUser()
    .then(user => {
      return this.AwsService.changePassword(user, form.currentPassword, form.password, form.passwordConfirmation)
    })
    .then(resp => {
      this.AlertService.displayAlert("Success! Your password has been changed.")
      this.state.go('layouts.index')
    })
    .catch(err => {
      console.log(err)
      this.AlertService.displayAlert(err.message)
    })
  }
}

controller.$inject = ['AwsService', 'AlertService', '$state']
