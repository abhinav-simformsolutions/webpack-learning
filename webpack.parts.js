
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const {
    MiniHtmlWebpackPlugin,
  } = require("mini-html-webpack-plugin");
  

  const { WebpackPluginServe } = require("webpack-plugin-serve");

  const wpCommonConfig=()=>({
    entry:'./src/index.js', //entry file
    output: {
        path: path.resolve(__dirname, 'dist') //path for the output folder 
    },
    module: {
        rules: [
           {
              test: /\.js$/,
              use: 'babel-loader', //to load js
           },
           {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'], //to load css
           },
           {
              test: /\.(png|j?g|svg|gif)?$/,
              use: 'asset/resource' // for loading all the assets
           }
  ]
     },
     plugins: [
        new htmlWebpackPlugin({
          template: './public/index.html',
        }),
        new CleanWebpackPlugin(), // it cleans older dist files and then compiles 
      ],

        

})

const productionConfig = () => ({
    mode: 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/, //will generate a new build for node modules with the name specified in name property
            name: 'vendors',
            chunks: 'initial',
          },
        },
      },
    },
})

//for development
const devConfig = () => ({
    mode: 'development',
    devtool: 'source-map', //This option controls if and how source maps are generated.
    devServer: {
      port: 5000,//port number to run the dev server
    },
  });
  
  
//exporting all the config files
module.exports = {
   wpCommonConfig,
    devConfig,
    productionConfig,
  };



// module.exports = {
//     watch: mode === "development",
//     entry: ["./src", "webpack-plugin-serve/client"],
//     mode,
//     plugins: [
//       new MiniHtmlWebpackPlugin({ }),
//       new WebpackPluginServe({
//         port: process.env.PORT || 8080,
//         static: "./dist",
//         liveReload: true,
//         waitForBuild: true,
//       }),
//     ],
//   };