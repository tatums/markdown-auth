export default class controller {
  constructor(AwsService, $mdToast, $state) {
    function showMessage(message) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position("bottom")
        .hideDelay(4000)
      )
    }

    this.title = "Login"

    this.signup = (form, validity) => {
      if (validity) {
        AwsService.signup(form)
        .then((resp) => {
          showMessage('You\'ve successfully signup up. Please Check you\'re email for a confirmation code.')
        })
        .catch((err) => {
          showMessage(err.err)
        })
      }
    }

    this.submit = function (form, validity) {
      if (validity) {
        AwsService.auth(form.username, form.password)
        .then((resp) => {
          showMessage('You are now logged in.')
          $state.go('pages.index')
        })
        .catch((err) => {
          console.log(err)
          showMessage('Sorry, the username/password combination failed   (╯°□°)╯︵ ┻━┻ ')
        })
      }
    }
  }
}
controller.$inject = ['AwsService', '$mdToast', '$state']
