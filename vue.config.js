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
//compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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
            config.plugins.push(new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
            // 去掉console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
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
