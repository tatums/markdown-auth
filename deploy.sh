#!/bin/bash

aws s3 cp dist/index.html s3://markdown-author/index.html --acl public-read
aws s3 cp dist/bundle.js s3://markdown-author/bundle.js --acl public-read
aws s3 cp dist/favicon.ico s3://markdown-author/favicon.ico --acl public-read

