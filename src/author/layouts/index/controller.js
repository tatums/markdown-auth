const defaultBody = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
        <title>{{ title }}</title>
      <meta name="description" content="{{ description }}">
    </head>
  <body>
    {{{ contents }}}
  </body>
</html>`


class controller {
  constructor(AwsService, $state, $filter, items) {
    this.title = "Layouts"
    this.items = items
    this.AwsService = AwsService
  }

  delete (item) {
    // TODO Move this into the promise.
    // Figure out why its not working as expected.
    let index = this.items.indexOf(item)
    this.items.splice(index, 1)
    this.AwsService.deleteObject(item.Key)
      .then((resp) => {
      }).catch((err) => {
        console.log('err: ', err)
      })
  }

  create (form, validity) {
    let key = `admin/layouts/${form.key}`
    this.AwsService.putObject(key, defaultBody)
      .then((resp) => {
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
