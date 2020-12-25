const path = require('path')
const resolve = dir =>{
    return path.join(__dirname, dir)
}
function getDay() {
    const myDate = new Date();
    return 'admin' + myDate.getFullYear() +
        bu0(myDate.getMonth() + 1) +
        bu0(myDate.getDate()) +
        bu0(myDate.getHours()) +
        bu0(myDate.getMinutes());
}
function bu0(t) {
    return t<10?'0'+t:t
}
const distTime = getDay();
//compression-webpack-plugin----gzip压缩插件
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

//brotli-webpack-plugin----gzip压缩插件
const BrotliPlugin = require('brotli-webpack-plugin');

const productionGzipExtensions = ['js', 'css' , 'png', 'jpeg']

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    //打本地包
	publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
    
    //打线上包
	// publicPath: process.env.NODE_ENV === "production" ? `https://images.24uvm.com/admin/${distTime}/` : "/", 
	outputDir: `dist/${ distTime }`,
	assetsDir: "static",
	filenameHashing: false,
	lintOnSave: false,
    productionSourceMap: false,
    // css配置项(没有则不用配置)
    // css: {
    //     loaderOptions: {
    //         stylus: {
    //             import: '~@/assets/styl/color.styl'
    //         }
    //     }
    // },
    // 别名配置项
    chainWebpack: config => {
        config.resolve.alias
            .set('@com', resolve('src/components/common'))
            .set('@styl', resolve('src/assets/styl'))
            .set('@img', resolve('src/assets/images'))
            .set('@js', resolve('src/utils'))
            .set('@pon', resolve('src/components'))
        // 转换base64(为了打包之后css不过大,故不转换base64,limit==1)
        config.module
            .rule('images')
                .use('url-loader')
                    .loader('url-loader')
                    .tap(options => Object.assign(options, { limit: 1 }))
    },
    configureWebpack: config => {
        if (isProduction) {
            // gzip压缩机制
            // config.plugins.push(new CompressionWebpackPlugin({
            //         asset: '[path].gz[query]',
            //         algorithm: 'gzip',
            //         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            //         threshold: 10240,
            //         minRatio: 0.8
            //     })
            // )

            // br压缩机制
            config.plugins.push(new BrotliPlugin({
                    asset: '[path].br[query]',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )

            // 去掉console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            // 配置分离第三方库
            config.optimization = {
                splitChunks: {
                    chunks: 'all',
                    minSize: 1, // 模块的最小体积
                    minChunks: 1, // 模块的最小被引用次数
                    maxAsyncRequests: 20, // 按需加载的最大并行请求数
                    maxInitialRequests: 20, // 一个入口最大并行请求数
                    cacheGroups: { //缓存组
                        vue: {
                            name: 'admin-vue',
                            test: /[\\/]node_modules[\\/]vue[\\/]/,
                            priority: 20
                        },
                        vuex: {
                            name: 'admin-vuex',
                            test: /[\\/]node_modules[\\/]vuex[\\/]/,
                            priority: 19
                        },
                        axios: {
                            name: 'admin-axios',
                            test: /[\\/]node_modules[\\/]axios[\\/]/,
                            priority: 18
                        },
                        'vue-router': {
                            name: 'admin-router',
                            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                            priority: 17
                        },
                        'element-ui': {
                            name: 'admin-element',
                            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                            priority: 16
                        },
                        'js-md5': {
                            name: 'admin-md5',
                            test: /[\\/]node_modules[\\/]js-md5[\\/]/,
                            priority: 15
                        },
                        'nprogress': {
                            name: 'admin-nprogress',
                            test: /[\\/]node_modules[\\/]nprogress[\\/]/,
                            priority: 14
                        },
                        'vue2-toast': {
                            name: 'admin-vue2-toast',
                            test: /[\\/]node_modules[\\/]vue2-toast[\\/]/,
                            priority: 13
                        },
                        'vendors': {
                            name: 'admin-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 1
                        }
                    }
                }
            }
        };
    },
    devServer: {
        host: "localhost",
        // host: "192.168.50.119",
        port: 7878,
        https: false,
        open: true
    }
};
