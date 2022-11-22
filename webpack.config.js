// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { v4: uuid } = require('uuid');

const currentDate = new Date();
const isProduction = process.env.NODE_ENV == 'production';

const cssStyleLoaders = [
   'style-loader',
   {
      loader: 'css-loader',
      options: {
         importLoaders: 1,
         modules: {
            exportGlobals: true,
            auto: /\.module\.\w+$/i,
            localIdentName: isProduction ? '[hash:base64:5]' : '[name]_[local]__[hash:base64:5]',
         },
      },
   },
   'postcss-loader',
];

const SOURCE_PATH = path.resolve(__dirname, 'src');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const BUILD_PATH = path.resolve(__dirname, 'build');

const config = {
   entry: [path.resolve(SOURCE_PATH, 'index.js')],
   output: {
      path: BUILD_PATH,
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
   },
   devServer: {
      open: true,
      host: 'localhost',
      port: 1911,
      compress: true,
      liveReload: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(PUBLIC_PATH, 'index.html'),
         favicon: path.resolve(PUBLIC_PATH, 'favicon.ico'),
      }),
      new DefinePlugin({
         ROOT_PATH: JSON.stringify(__dirname),
         isProduction,
      }),
      new ProvidePlugin({
         _: 'lodash',
      }),
      new WebpackManifestPlugin({
         publicPath: PUBLIC_PATH,
         generate(seed, files, entries) {
            return {
               short_name: 'Love',
               name: 'My Love for Yen Nhi',
               icons: [
                  {
                     src: 'favicon.ico',
                     sizes: '64x64 32x32 24x24 16x16',
                     type: 'image/x-icon',
                  },
               ],
               start_url: '.',
               display: 'standalone',
            };
         },
      }),

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
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[hash][ext][query]',
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'images/[hash][ext][query]',
            },
         },

         // Add your rules for custom modules here
         // Learn more about loaders from https://webpack.js.org/loaders/
      ],
   },
   resolve: {
      fallback: {
         fs: false,
      },
   },
};

module.exports = () => {
   if (isProduction) {
      config.mode = 'production';

      config.plugins.push(
         // @ts-ignore
         new WorkboxWebpackPlugin.GenerateSW({
            cacheName:
               'Gift for Yen Nhi ver. ' +
               `${currentDate.getMonth()}${currentDate.getDate}${currentDate.getFullYear}`,
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
               {
                  urlPattern: /\.js$/i,
                  handler: 'NetworkFirst',
                  options: {
                     cacheName: `javascript-content-${uuid()}`,
                     backgroundSync: {
                        name: 'synchronize js files in background',
                     },
                     expiration: {
                        maxAgeSeconds: 86400,
                     },
                  },
               },
               {
                  urlPattern: /\.(png|svg|jpg|jpeg|gif)$/i,
                  handler: 'CacheFirst',
                  options: {
                     cacheName: `image-content-${uuid()}`,
                     expiration: {
                        maxAgeSeconds: 86400,
                     },
                  },
               },
               // {
               //    urlPattern: 'index.html',
               //    handler: 'CacheFirst',
               //    options: {
               //       cacheName: 'html index file',
               //       expiration: {
               //          maxAgeSeconds: 86400,
               //       },
               //    },
               // },
            ],
         }),
         new CopyWebpackPlugin({
            patterns: [
               {
                  from: path.resolve(PUBLIC_PATH, 'soundtracks'),
                  to: path.resolve(BUILD_PATH, 'soundtracks'),
               },
            ],
         }),
         new CleanWebpackPlugin()
      );
   } else {
      config.mode = 'development';
   }
   return config;
};
