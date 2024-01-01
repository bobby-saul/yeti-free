module.exports = {
  entry: './js/src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/js/dist',
    filename: 'index.js',
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    open: true,
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
    port: 8080,
  },
};
