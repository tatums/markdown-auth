class controller {
  constructor(id, post, AwsService, AlertService, $state) {
    this.id = id
    this.post = post
    this.AwsService = AwsService
    this.AlertService = AlertService
    this.state = $state
    this.body = post.Body.toString()
    this.saveInline = true
  }

  save() {
    this.AwsService.putObject(this.id, this.body)
      .then(resp => {
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
controller.$inject = ['id', 'post', 'AwsService', 'AlertService', '$state']
export default controller
