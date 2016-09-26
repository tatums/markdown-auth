export default class controller {
  constructor(AwsService, item) {
    this.item = item
    this.body = item.Body.toString()
  }
}
controller.$inject = ['AwsService', 'item']
