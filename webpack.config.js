const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const prettify = false;

module.exports = {
  entry: {
    app: './client/app.js',
    style: './client/style/index.scss'
  },
  output: {
    path: path.resolve(__dirname, './.dist'),
    filename: '[name].js'
  },
  optimization: {
    minimize: prettify
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }, 
      {
        test: /\.scss$/,
        use: [ {loader:'file-loader', options: { name: "style.css"}} , 'extract-loader', {loader:'css-loader', options: { url: false}}, 'sass-loader' ],
      }, 
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: prettify
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader',
          options: {
            prettify: prettify,
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    /*new MiniCssExtractPlugin({
      filename: "style.css"
    }),*/
  ]
}
