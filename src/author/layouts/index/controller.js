class controller {
  constructor(AwsService, $state, $filter, items) {
    this.title = "Layouts"
    this.items = items
    this._AwsService = AwsService
  }

  delete (item) {
    this._AwsService.deleteBucketLayout(item.Key)
      .then((resp) => {
        let index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch((err) => {
        console.log('err: ', err)
      })
  }

  create (form, validity) {
    this._AwsService.createBucketLayout(form.key)
      .then((resp) => {
        let key = `layouts/${form.key}`
        let date = new Date()
        this.items.unshift({ Key: key, LastModified: date })
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

}
controller.$inject = ['AwsService', '$state', '$filter', 'items']

export default controller
