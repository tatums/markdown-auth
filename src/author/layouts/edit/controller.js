export default class controller {
  constructor(AwsService, $state, item, id) {
    this.id = id
    this.item = item
    this.body = item.Body.toString()
    this.form = {
      body: item.Body.toString()
    }
    this.save = (form, validity) => {
      console.log('save!')
      AwsService.putBucketLayout(this.id, form.body)
      .then(resp => {
        console.log(resp)
        $state.go('layouts.index')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
controller.$inject = ['AwsService', '$state', 'item', 'id']
