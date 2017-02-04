[![Build Status][travis-image]][travis-url]

> 一个全端通用的demo

> 通过读取数据模型，批量生成SQL语句，从而达到伪造数据的目的。

> electron版使用[electron-vue](https://github.com/SimulatedGREG/electron-vue)构建。

## 使用

### Web版本
访问http://sql.chuune.cn/

``` bash
git clone git@github.com:goumang2010/mockSQL.git

cd mockSQL

npm install

npm run dev:web
```
或发布

``` bash
npm run publish
```

### electron版

``` bash
git clone git@github.com:goumang2010/mockSQL.git

cd mockSQL

npm install

npm run dev
```
或build后使用：

``` bash
git clone git@github.com:goumang2010/mockSQL.git

cd mockSQL

npm install

# Windows系统
npm run build:win32

# Linux系统
npm run build:linux
```

## 数据模型

### sql文件
例子：
```SQL
DROP TABLE IF EXISTS `table_name`;
CREATE TABLE `table_name` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `visitor_num` int(11) NOT NULL COMMENT '访问人数',
  `visited_time` int(11) NOT NULL COMMENT '访问次数',
  `shared_time` int(11) NOT NULL COMMENT '被分享次数',
  `favorited_time` int(11) NOT NULL COMMENT '被收藏次数',
  `date` date NOT NULL COMMENT '数据日期',
  `day_type` tinyint(1) NOT NULL COMMENT '1==>天，2==>周，3==>月',
  `type` varchar(255) NOT NULL COMMENT '数据类型',
  `ver` varchar(255) NOT NULL COMMENT '版本',
  `channel` varchar(255) NOT NULL COMMENT '渠道',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### js文件
使用[node-orm](https://github.com/dresende/node-orm2)的模型文件。
例子：
```
module.exports = {
    id: { type: 'number', key: true },
    name: String, // 名称
    visitor_num: Number, // 访问人数
    visited_time: Number, // 访问次数
    shared_time: Number, // 被分享次数
    favorited_time: Number, // 被收藏次数
    date: Date, // 数据日期
    day_type: Number, // 1==>天，2==>周，3==>月
    type: String, // 数据类型
    ver: String, // 版本
    channel: String // 渠道
};
```

## TODO
- [x] 伪造插入
- [x] 伪造更新
- [x] vue调用nodeAPI
- [x] 帮助页面
- [x] Vuex管理跳转
- [ ] SQL model -> js model
- [ ] 登录数据库
- [ ] 数据库分类
- [ ] 真实数据转移
- [ ] 构建后台，复用前端

## Original Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

[travis-image]: https://img.shields.io/travis/goumang2010/mockSQL.svg?style=flat-square
[travis-url]: https://travis-ci.org/goumang2010/mockSQL