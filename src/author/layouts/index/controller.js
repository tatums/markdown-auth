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
  constructor(AwsService, items, $scope) {
    this.title = "Layouts"
    this.items = items
    this.AwsService = AwsService
    this.scope = $scope
  }


  delete (item) {
    this.AwsService.deleteObject(item.Key)
      .then(resp => {
        this.scope.$apply(() => {
          let index = this.items.indexOf(item)
          this.items.splice(index, 1)
          this.deleted = true
        })
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  create (form, validity) {
    let key = `admin/layouts/${form.key}`
    this.AwsService.putObject(key, defaultBody)
      .then((resp) => {
        this.scope.$apply(() => {
          let date = new Date()
          this.items.unshift({ Key: key, LastModified: date })
        })
      }).catch((err) => {
        console.log(err)
      })
  }

}
controller.$inject = ['AwsService', 'items', '$scope']

export default controller
