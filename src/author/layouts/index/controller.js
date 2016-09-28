export default class controller {
  constructor(AwsService, $state, $filter, items) {
    this.title = "Layouts"
    this.getLayouts = AwsService.getLayouts
    this.items = items

    this.delete = (item) => {
      //let item = $filter('filter')(this.items, {Key: key}, true)[0];
      let index = this.items.indexOf(item)
      this.items.splice(index, 1)
      AwsService.deleteBucketLayout(item.Key)
      .then(resp => {
      })
      .catch(err => {
        console.log(err)
      })
    }

    this.create = (form, validity) => {
      AwsService.createBucketLayout(form.key)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
controller.$inject = ['AwsService', '$state', '$filter', 'items']
