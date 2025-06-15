const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './docs/index.js',
    article: './docs/article.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'), // основная сборка
      },
      {
        directory: path.resolve(__dirname, 'data'), // данные
        publicPath: '/data',
      },
      {
        directory: path.resolve(__dirname, 'media'), // медиа
        publicPath: '/media',
      },
    ],
    open: true,
    compress: true,
    port: 8080,
    hot: true,
  }
  ,
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './docs/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'data', to: 'data' },
        { from: 'media', to: 'media' }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'article.html',
      template: './docs/article.html',
      chunks: ['article'] 
    })

  ]
}