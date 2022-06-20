nvm 管理 nodejs 和 npm 的版本
npm 可以管理 nodejs 的第三方插件
afdf1aba41d6c64862a609b6d4b5329482630fee

http://lookdiv.com/  5263

#### 什么是Vue脚手架?

vue-cli是有Vue提供的一个官方cli，专门为单页面应用快速搭建繁杂的脚手架。它是用于自动生成vue.js+webpack的项目模板，是为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载，保存时 lint 校验，以及生产环境可用的构建版本。
安装Vue脚手架

```npm install -g @vue/cli```

上面安装的是Vue cli3版本，如果想按照2版本初始化项目是不可以的

因此想使用 vue init 可以全局安装一个桥接工具

```npm install -g @vue/cli-init```

Vue-cli2初始化项目

```vue init webpack my-project```

启动npm run dev

Vue-cli3初始化项目

```vue create my-project```

启动npm run serve

#### 3-1
```
//api.js
export function detail(book) {
  return axios({
    method: 'get',
    url: `/appBaseUrl/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}



#淘宝镜像设置
npm install --registry=https://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org
#npm安装模块
[npm install xxx]  利用npm安装xxx模块到当前命令行所在目录；
[npm install -g xxx]  利用npm安装全局模块xxx；

#本地安装时将模块写入package.json中：
[npm install xxx]  安装但不写入package.json；
[npm install xxx --save]  安装并写入package.json的"dependencies"中
[npm install xxx --save-dev]  安装并写入package.json的"devDependencies"中
注：-S 等同于--save

#npm 删除模块
[npm uninstall xxx]  删除xxx模块；
[npm uninstall -g xxx]  删除全局模块xxx；

#Mac切换node版本
npm install -g n //安装n node版本管理
sudo n 14.16.1   //切换安装到node@14.16.1版本
```
#### 3-2
```
#先安装删除工具，然后使用删除命令
npm install rimraf -g
rimraf node_modules

#安装和卸载vue脚手架
npm install -g @vue/cli
npm uninstall vue-cli -g
#查看vue脚手架版本
vue --version
#查看vue版本
npm list vue
#vue图形管理器
vue ui
#安装电子书插件
npm i --save epubjs

npm i --save vue-router
npm i --save vuex
npm i --save-dev node-sass sass-loader
```
#### 3-3 字体图标和web字体
https://icomoon.io/

fonts字体放到public目录下，通过index.html的link引入
```
<link rel="stylesheet" href="<%= BASE_URL %>fonts/daysOne.css">
```
或者放到assets文件夹下，通过main.js的import引入
import '../assets/styles/iconfont.css'

reset 的目的不是让默认样式在所有浏览器下一致, 而是减少浏览器在默认行高、页边空白和标题字体大小等方面的不一致性
https://meyerweb.com/eric/tools/css/reset/index.html

安装vue-devtools
https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md

npm install -g @vue/devtools

npm install --save-dev @vue/devtools

#### 3-4 配置Nginx服务
查看nginx配置文件，在http对象下再增加一个server
```
http {
server {
listen  80;
server_name  localhost;
root  /Users/sam/upload;
autoindex  on;
location / {
  add_header  Access-Control-Allow-Origin *;
  index  index.html index.htm;
}
}
}
```
listen：监听端口号，最新的macOS系统不允许设置80端口，可以选择8000以上的端口号

server_name：指定虚拟主机的名称

root：资源文件的根路径，必须指向一个文件夹，该路径为资源文件存放的位置，例如用户访问：localhost/book/a.epub，实际访问的资源路径为：/Users/sam/upload/book/a.epub

autoindex：是否打开目录浏览功能，如果打开，当我们访问localhost/时，就可以在网页上查看/Users/sam/upload目录下的所有文件

location：路由规则匹配，location /表示匹配所有路由

add_header：表示在响应头中添加指定内容，这里添加Access-Control-Allow-Origin为*是为了解决前端跨域问题，如果不配置这个选项，前端请求资源时会出现跨域错误，希望详细了解跨域原理的同学可以点击这里学习
index：指定访问根路径时默认访问的资源文件，比如我们访问localhost/，实际Nginx会找到/Users/sam/upload/index.html或/Users/sam/upload/index.htm进行返回


查看Nginx的版本号：nginx -V

启动Nginx：start nginx

快速停止或关闭Nginx：nginx -s stop

正常停止或关闭Nginx：nginx -s quit

配置文件修改重装载命令：nginx -s reload