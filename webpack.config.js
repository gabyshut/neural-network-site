const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    article: './src/article.js',
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
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png',
      chunks: ['main'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'data', to: 'data' },
        { from: 'media', to: 'media' },
        {from: 'src/images/favicon.png', to: ''}
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'article.html',
      template: './src/article.html',
      chunks: ['article'] 
    })

  ]
}