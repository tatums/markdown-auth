class controller {

  constructor(id, page, AwsService, $state) {
    this.id = id
    this.page = page
    this.AwsService = AwsService
    this.state = $state
    this.body = page.Body.toString()
  }

  save(form, validity) {
    this.AwsService.putObject(this.id, this.body)
      .then(resp => {
        console.log(resp)
        this.state.go('pages.index')
      })
      .catch(err => {
        console.log(err)
      })
  }

}
controller.$inject = ['id', 'page', 'AwsService', '$state']
export default controller
