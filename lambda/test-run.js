const download = require('./lib/download')
const build = require('./lib/build')
const publish = require('./lib/publish')

download()
  .then(build)
  .then(publish)
  .then(resp => {
    console.log(resp)
  })
  .catch(err => {
    console.log('ERRRRRRR', err)
  })
