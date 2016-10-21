'use strict'

//console.log(process.env['PATH'])
//process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']

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
