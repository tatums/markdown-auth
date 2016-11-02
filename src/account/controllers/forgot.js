export default class controller {
  constructor(AwsService, AlertService) {
    this.AwsService = AwsService
    this.AlertService = AlertService
  }

  forgot(form, validity) {
    if (validity) {
      this.AwsService.forgotPassword(form.username)
      .then(resp => {
        this.AlertService.displayAlert(`An ${resp.CodeDeliveryDetails.DeliveryMedium} was sent.`)
      })
      .catch(err => {
        this.AlertService.displayAlert(err.message)
      })
    }
  }
}
controller.$inject = ['AwsService', 'AlertService']
