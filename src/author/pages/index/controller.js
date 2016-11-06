const defaultBody = `---
title: A blog post
date: 2016-01-21
layout: post.html
---
An interesting post.
`

class controller {

  constructor(AwsService, pages) {
    this.pages = pages
    this.AwsService = AwsService
  }

  create (form, validity) {
    let key = `admin/src/${form.key}`
    this.AwsService.putObject(key, defaultBody)
      .then((resp) => {
        let date = new Date()
        this.items.unshift({ Key: key, LastModified: date })
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

  delete (page) {
    let index = this.pages.indexOf(page)
    this.pages.splice(index, 1)
    this.AwsService.deleteObject(page.Key)
      .then((resp) => {
      }).catch((err) => {
        console.log('err: ', err)
      })
  }

}
controller.$inject = ['AwsService', 'pages']
export default controller
