const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");

const config = {
    mode: 'development',
    entry: {
        "test" : __dirname + '/tests/test.ts',
        },
    output: {
      filename: 'test.min.js',
      path : path.resolve(__dirname + "/www/"),
     },
    /*
    optimization: {
        splitChunks: {
          name: 'vendor',
          chunks: 'initial',
        }
    },*/
    resolve: {
        extensions: [".ts"],
        plugins: [new TsconfigPathsPlugin({
            configFile:  __dirname + "/tsconfig.json"
        }
        )], 
    },
    devtool : "hidden-source-map",
    module: {
        rules: [
            { 
              test: /\.ts?$/,
              use : { 
                  loader: 'ts-loader',
                  options : {
                       transpileOnly : false,
                       compilerOptions:{
                        "declaration": false,                   
                        "declarationMap": false, 
                       }
                    } 
                } 
            }
        ]
    }
  };

const mode = (process.argv.find(arg => arg.slice(0,6) === "--mode") 
|| "").replace("--mode=","") || config.mode


module.exports = config
