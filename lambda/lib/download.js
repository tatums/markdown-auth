const fse = require('fs-extra')
const path = require('path')
const AWS = require('aws-sdk')
const mime  = require('mime-types')
const _ = require('underscore')
const config = require('../config.json')
AWS.config.loadFromPath('./config.json')

const s3 = new AWS.S3()
const download = (filePath) => {
  return s3.getObject({
    Bucket: config.sourceBucket,
    Key: filePath
  }).promise()
    .then(resp => {
      fse.ensureFileSync(`/tmp/${filePath}`)
      fse.writeFileSync(`/tmp/${filePath}`, resp.Body.toString(), 'utf8')
      return Promise.resolve(resp)
    })
}

module.exports = () => {
  return s3.listObjectsV2({
    Bucket: config.sourceBucket,
    //Prefix: '/'
  }).promise()
    .then(objects => {
      const items = _.reject(objects.Contents, (obj) => {
        return obj.Key.split('').reverse()[0] == '/'
      })
      var promises = items.map(object => {
        return download(object.Key)
      })
      return Promise.all(promises)
    })
}
