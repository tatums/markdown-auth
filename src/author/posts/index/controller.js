const defaultBody = `---
title: A blog post
date: 2016-01-21
layout: post.html
draft: true
---
An interesting post.
`


class controller {
  constructor(posts, AwsService) {
    this.posts = posts
    this.AwsService = AwsService
  }

  create (form, validity) {
    let key = `admin/src/posts/${form.key}`
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
controller.$inject = ['posts', 'AwsService' ]
export default controller
