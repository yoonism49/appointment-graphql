var path = require('path');
var webpack = require('webpack');

var entries = ['./client/index'];
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var plugins = [];

if(process.env.NODE_ENV !== 'production') {
  entries = entries.concat([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ]);

  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'client')
    },
    { 
        test: /\.json$/,
        loader: 'json-loader'
    },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ]
  }
};
