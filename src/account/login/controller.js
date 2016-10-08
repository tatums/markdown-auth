export default class controller {
  constructor(AwsService, AlertService, $state) {
    this.AwsService = AwsService
    this.AlertService = AlertService
    this.state = $state
    this.title = "Login"

    this.signup = (form, validity) => {
      if (validity) {
        this.AwsService.signup(form)
        .then(resp => {
          this.AlertService.displayAlert('You\'ve successfully signup up. Please Check you\'re email for a confirmation code.')
        })
        .catch(err => {
          this.AlertService.displayAlert(err.err)
        })
      }
    }

    this.submit = function (form, validity) {
      if (validity) {
        this.AwsService.auth(form.username, form.password)
        .then((resp) => {
          this.AlertService.displayAlert('You are now logged in.')
          this.state.go('pages.index')
        })
        .catch((err) => {
          console.log(err)
          this.AlertService.displayAlert('Sorry, the username/password combination failed   (╯°□°)╯︵ ┻━┻ ')
        })
      }
    }
  }
}
controller.$inject = ['AwsService', 'AlertService', '$state']
