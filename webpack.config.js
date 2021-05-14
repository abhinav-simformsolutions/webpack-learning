
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

//we wil use all the modes in he switch statement and if it matches we will merge it and call the config function  for that particular mode the function below does that.

const wpMainConfig = (mode) => {
  switch (mode) {
    case 'development':
      return merge(parts.devConfig(), parts.wpCommonConfig());
    case 'production':
      return merge(parts.productionConfig(), parts.wpCommonConfig());
    default:
      return merge({ mode: 'none' }, parts.wpCommonConfig());
  }
};

module.exports=wpMainConfig('development') //passing the mode to the function
  