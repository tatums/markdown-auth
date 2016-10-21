const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')

module.exports = () => {

  const sourcePath = '/tmp/admin/src'

  return new Promise(function (resolve, reject) {
    Metalsmith(__dirname)
      .metadata({
        title: "Hello",
        description: "just another hello world.",
      })
      .source(sourcePath)
      .destination('/tmp/build')
      .clean(true)
      .use(markdown())
      .use(layouts({
        engine: 'handlebars',
        directory: "/tmp/admin/layouts"
      }))
      .build(function(err, files) {
        if (err) { reject(err) }
        resolve(files)
      })
  })

}
