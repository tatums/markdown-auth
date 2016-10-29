const fs = require('fs')
const AWS = require('aws-sdk')
const mime  = require('mime-types')
const glob = require("glob")
const _ = require('underscore')
const config = require('../config.json')

const buildPrefix = '/tmp/build'
const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
})

function putObject(path) {
  const Key = path.replace(new RegExp(/\/tmp\/build\//), '')
  const params = {
    Bucket: config.targetBucket,
    Key: Key,
    Body: fs.readFileSync(path, "utf8"),
    ContentType: mime.lookup(Key),
  };
  return s3.putObject(params).promise();
}

function readHtmlFiles () {
  return new Promise((resolve, reject) => {
    glob(`${buildPrefix}/**/*.*`, (er, files) => {
      if (er) reject(er)
      resolve(files)
    })
  })
}

function uploadFiles(files) {
  return Promise.all(
    files.map(file => {
      return putObject(file)
    })
  )
}

function filesMarkedForDeletion (files) {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2({
      Bucket: config.targetBucket
    }, function(err, data) {
      if (err) reject(err)
      var items = _.reject(data.Contents, (item) => {
        return _.contains(files, `${buildPrefix}/${item.Key}`)
      });
      resolve(items)
    });
  })
}

function deleteFiles (files) {
  return filesMarkedForDeletion(files)
  .then((resp) => {
    var objects = resp.map(obj => {
      return {Key: obj.Key}
    })
    var params = {
      Bucket: config.targetBucket,
      Delete: { Objects: objects  }
    };
    return s3.deleteObjects(params).promise()
  })
}

module.exports = () => {
  console.log("\nstart of publishing\n");
  return readHtmlFiles()
    .then(files => {
      return Promise.all([
        deleteFiles(files),
        uploadFiles(files)
      ])
    })
}
