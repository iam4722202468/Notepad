const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, `views`),
  entry: {
    main: './app.js'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  output: {
    path: path.join(__dirname, `public`),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-runtime']
        }
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass']
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|json)$/,
        loaders: ['url?limit=10000']
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loaders: ['file']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 3 versions'] })
  ]
}
