export default class controller {
  constructor(AwsService) {
    this.AwsService = AwsService
  }

  forgot(form, validity) {
    if (validity) {
      this.AwsService.forgotPassword(form.username)
      .then(resp => {
        console.log('resp', resp);
      })
    }
  }
}
controller.$inject = ['AwsService']
