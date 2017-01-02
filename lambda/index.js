'use strict'

const download = require('./lib/download')
const build = require('./lib/build')
const publish = require('./lib/publish')

exports.handler = (event, context, callback) => {

  download()
    .then(build)
    .then(publish)
    .then(resp => {
      console.log(resp)
      callback(null, {message: resp})
    })
    .catch(err => {
      console.log('ERRRRRRR', err)
      callback(err)
    })
}
