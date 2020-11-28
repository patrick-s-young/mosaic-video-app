const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      api: path.resolve(__dirname, './src/api/'),
      app: path.resolve(__dirname, './src/app/'),
      components: path.resolve(__dirname, './src/components/'),
      features: path.resolve(__dirname, './src/features/'),
      utils: path.resolve(__dirname, './src/utils/')
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
      template: './src/index.html'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: path.join(__dirname, '../volume/public'),
    proxy: {
      '/download': 'http://localhost:3000',
      '/frames': 'http://localhost:3000',
      '/resize': 'http://localhost:3000'
    }
  },
  devtool: 'inline-source-map'
};