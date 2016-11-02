export default class controller {
  constructor(AwsService, AlertService) {
    this.AwsService = AwsService
    this.AlertService = AlertService
  }

  claim(form, validity) {
    if (validity) {
      this.AwsService.claim(form.username, form.code, form.password)
      .then(resp => {
        console.log('resp', resp);
        this.AlertService.displayAlert(`Success ᕕ( ᐛ )ᕗ`)
      })
      .catch(err => {
        this.AlertService.displayAlert(err.message)
      })
    }
  }
}
controller.$inject = ['AwsService', 'AlertService']
