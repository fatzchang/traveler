const path = require('path');
const src = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'production',
  entry: path.join(src, 'traveler'),
  module: {
    rules: [{
      test: /\.js$/,
      use: ['eslint-loader'],
      include: src
    }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'traveler.js',
    library: 'traveler'
  }
}