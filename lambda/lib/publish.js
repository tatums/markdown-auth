const fs = require('fs')
const AWS = require('aws-sdk')
const mime  = require('mime-types')
const glob = require("glob")
const config = require('../config.json')

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
    glob("/tmp/build/**/*.*", (er, files) => {
      if (er) reject(er)
      resolve(files)
    })
  })
}

function uploadFiles(files) {
  console.log("\nstart of publishing\n");
  return Promise.all(
    files.map(file => { return putObject(file) })
  )
}


module.exports = () => {
  return readHtmlFiles()
    .then(files => {
      return uploadFiles(files)
    })
}
