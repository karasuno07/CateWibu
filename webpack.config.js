// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const cssStyleLoaders = ['style-loader', 'css-loader', 'postcss-loader'];

const config = {
   entry: path.resolve(__dirname, 'src', 'index.js'),
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
      clean: true,
   },
   devServer: {
      open: true,
      host: 'localhost',
      port: 3000,
      compress: true,
      liveReload: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new CleanWebpackPlugin(),

      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
   ],
   module: {
      rules: [
         {
            test: /\.js$/i,
            loader: 'babel-loader',
         },
         {
            test: /\.s[ac]ss$/i,
            use: [...cssStyleLoaders, 'sass-loader'],
         },
         {
            test: /\.css$/i,
            use: cssStyleLoaders,
         },
         {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset/resource',
         },

         // Add your rules for custom modules here
         // Learn more about loaders from https://webpack.js.org/loaders/
      ],
   },
};

module.exports = () => {
   if (isProduction) {
      config.mode = 'production';

      // @ts-ignore
      config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
   } else {
      config.mode = 'development';
   }
   return config;
};
