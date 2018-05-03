module.exports = {
  entry: [
    'babel-polyfill', './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    {test: /\.s(a|c)ss$/,
     loader: 'style!css?importLoaders=2!postcss!sass?sourceMap&amp;outputStyle=expanded'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    disableHostCheck: true
    // docker에서 0.0.0.0 호스트로 배포할 수 있도록 추가
  }
};
