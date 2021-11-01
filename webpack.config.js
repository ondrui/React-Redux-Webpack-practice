const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    static: './src',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/index.html',
      //favicon: "./src/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg|webp|gif|ico)/,
        type: 'asset/resource'
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
}

//Using entry: './src/index.jsx': you can omit it, that's the default.
//Using output.path: path.resolve(__dirname, 'dist'): you can omit it, that's the default.
//Using output.filename: '[name].js': you can omit it, that's the default.