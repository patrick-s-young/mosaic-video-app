const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      api: path.resolve(__dirname, './client/api/'),
      app: path.resolve(__dirname, './client/app/'),
      components: path.resolve(__dirname, './client/components/'),
      features: path.resolve(__dirname, './client/features/'),
      utils: path.resolve(__dirname, './client/utils/')
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    proxy: {
      '/upload': 'http://localhost:3000',
      '/render': 'http://localhost:3000',
      '/download': 'http://localhost:3000'
    }
  },
  devtool: 'inline-source-map'
};