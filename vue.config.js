function mock(app, url, data) {
    app.get(url, (request, response) => {
        response.json(data)
    })
}

const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')

module.exports = {
    publicPath:process.env.NODE_ENV === 'production'?'./':'/',
    // 运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: "dist",
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: "public",
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        open: false, //配置自动启动浏览器
        proxy: {
            '/bookApi': {
                target: 'http://192.168.31.131:8088',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/bookApi': '/'  // rewrite path
                }
            },
            '/appBaseUrl': {
                target: 'http://47.99.166.157:3000',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/appBaseUrl': '/'  // rewrite path
                }
            },
            '/appEpubOpfUrl': {
                target: 'http://47.99.166.157/epub2',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/appEpubOpfUrl': '/'  // rewrite path
                }
            },
        },
        before(app) {
            mock(app, '/book/home', homeData)
            mock(app, '/book/shelf', shelfData)
            mock(app, '/book/list', listData)
            mock(app, '/book/flat-list', flatListData)
        }
    },


    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 37.5, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    }
}