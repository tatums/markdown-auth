const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const permalinks  = require('metalsmith-permalinks')
const layouts = require('metalsmith-layouts')
const discoverPartials = require('metalsmith-discover-partials')
const drafts = require('metalsmith-drafts')

module.exports = () => {

  const sourcePath = '/tmp/admin/src'

  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .metadata({
        title: "Hello",
        description: "just another hello world.",
      })
      .source(sourcePath)
      .destination('/tmp/build')
      .clean(true)
      .use(drafts())
      .use(discoverPartials({
        directory: "/tmp/admin/layouts",
        pattern: /\.hbs$/
      }))
      .use(collections({
        posts: {
          pattern: 'posts/*.md',
          sortBy: 'date',
          reverse: true
        }
      }))
      .use(markdown())
      .use(permalinks())
      .use(layouts({
        engine: 'handlebars',
        directory: "/tmp/admin/layouts"
      }))
      .build((err, files) => {
        if (err) { reject(err); console.log(`\n\n ${err} \n\n`); return; }
        console.log('\nbuild complete\n')
        resolve(files)
      })
  })

}
