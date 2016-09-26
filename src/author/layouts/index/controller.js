export default class controller {
  constructor(AwsService, items) {
    this.title = "Layouts"
    this.getLayouts = AwsService.getLayouts
    this.items = items
  }
}
controller.$inject = ['AwsService', 'items']
