export default class controller {
  constructor(AwsService) {
    this.AwsService = AwsService
  }

  claim(form, validity) {
    console.log(form, validity);
    if (validity) {
      this.AwsService.claim(form.username, form.code, form.password)
      .then(resp => {
        console.log('resp', resp);
      })
      .catch(err => {
        console.log('err',err);
      })
    }
  }
}
controller.$inject = ['AwsService']
