export default class controller {
  constructor(AwsService, $state, item, id) {
    this.AwsService = AwsService
    this.state = $state
    this.item = item
    this.id = id
    this.body = item.Body.toString()
  }

  save () {
    this.AwsService.putObject(this.id, this.body)
      .then(resp => {
        this.state.go('layouts.index')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
controller.$inject = ['AwsService', '$state', 'item', 'id']
