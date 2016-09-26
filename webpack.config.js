var path = require('path');
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.min\.js$/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: path.join(__dirname, 'src'),
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  }
};
