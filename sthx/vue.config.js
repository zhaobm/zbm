// vue.config.js
//const CopyWebpackPlugin = require('copy-webpack-plugin');'
module.exports = {
    // pages:{
    //   html:{
    //       entry:"./src/views/html/video.min.js",
    //       template:"./src/views/html/e.html"
    //   }
    // },
    // configureWebpack: config => {
    //     const cwp = new CopyWebpackPlugin([
    //         {
    //             from: './node_modules/earthsdk/dist/XbsjCesium',
    //             to: 'js/earthsdk/XbsjCesium',
    //             toType: 'dir'
    //         },
    //         {

    //             from: './node_modules/earthsdk/dist/XbsjEarth',
    //             to: 'js/earthsdk/XbsjEarth',
    //             toType: 'dir'
    //         },
    //     ]);
    //     config.plugins.push(cwp);
    // },


    devServer: {
       // proxy: 'https://sjy-api.gagogroup.cn/'
        /*proxy: {
            '/api': {
                target: 'https://localhost:8013',
                changeOrigin: true,
                pathRewrite:{
                    '/api':''
                }
               // secure: false
            }
        },*/
        port:8085
    },
    publicPath: './'
/*    baseUrl: process.env.NODE_ENV === 'production' ? '1/qlst/' : '/',*/
    

}