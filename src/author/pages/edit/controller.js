class controller {

  constructor(id, page, AwsService, AlertService, $state) {
    this.id = id
    this.page = page
    this.AwsService = AwsService
    this.AlertService = AlertService
    this.state = $state
    this.body = page.Body.toString()
    this.saveInline = true
  }

  save() {
    this.AwsService.putObject(this.id, this.body)
      .then(resp => {
        console.log(this.AlertService);
        this.AlertService.displayAlert('Saved...')
        if (this.saveInline == false) {
          this.state.go('pages.index')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

}
controller.$inject = ['id', 'page', 'AwsService', 'AlertService', '$state']
export default controller
