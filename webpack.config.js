const path = require('path')

module.exports = {
  entry: './src/client.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
    libraryExport: 'default',
    libraryTarget: 'window',
    library: 'Client'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
}
