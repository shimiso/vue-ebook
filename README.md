nvm 管理 nodejs 和 npm 的版本
npm 可以管理 nodejs 的第三方插件
```
#淘宝镜像设置
npm install --registry=https://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org
#npm安装模块
[npm install xxx]利用 npm 安装xxx模块到当前命令行所在目录；
[npm install -g xxx]利用npm安装全局模块xxx；

#本地安装时将模块写入package.json中：
[npm install xxx]安装但不写入package.json；
[npm install xxx --save] 安装并写入package.json的"dependencies"中
[npm install xxx --save-dev]安装并写入package.json的"devDependencies"中
注：-S 等同于--save

npm 删除模块
[npm uninstall xxx]删除xxx模块；
[npm uninstall -g xxx]删除全局模块xxx；
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
#### web字体
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
