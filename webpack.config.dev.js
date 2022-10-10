const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const publicPath = '/'

module.exports = {
  entry: {
    index: [path.resolve(__dirname, './src/main.js')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name]_chunk.js",
    clean: true,
    publicPath,
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 9301,
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024,
      minChunks: 1,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        // exclude: resolveApp('src'),
        use: [
          'babel-loader',
        ],
      },
      {
        enforce: 'pre', // 在所有loader编译之前执行eslint检查
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      inject: true,
      filename: 'index.html',
    }),
    // new BundleAnalyzerPlugin(),
    // new CopyWebpackPlugin({ // build
    //   patterns: [
    //     {
    //       from: "public", to: path.resolve(__dirname , 'dist'),
    //       globOptions: {
    //         ignore: [
    //           // Ignore all `txt` files
    //           "**/*index.html"
    //         ]
    //       },
    //     },
    //     {
    //       from: "static", to: 'static',
    //       noErrorOnMissing: true,
    //     }]

    // })
  ]
}