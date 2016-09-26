export default class controller {
  constructor(AwsService, item, id) {
    this.id = id
    this.title = "Layout Show"
    this.item = item
    this.body = item.Body.toString()
  }
}
controller.$inject = ['AwsService', 'item', 'id']
