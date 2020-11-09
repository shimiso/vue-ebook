module.exports = {
    publicPath:process.env.NODE_ENV === 'production'?'./':'/',
    devServer: {
        //port: 8080, // 端口号
        //host: 'localhost',
        open: true, //配置自动启动浏览器
        proxy: {
            '/bookApi': {
                target: 'http://10.0.10.175:8088',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/bookApi': '/'  // rewrite path
                }
            },
        }
    }
}