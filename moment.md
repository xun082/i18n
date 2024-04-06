最近一直在做 [前端脚手架项目](https://github.com/xun082/create-neat)，我最近主要做的事情是写一些脚本来实现自动化。

国际化，老生常谈的技术，现行业内已经有许多成熟的技术方案。但是根据上面中经常用到的技术，我萌生了一个比较特别的想法，来通过自动化的方式来实现国际化。

# 国际化的核心思路

不论是现有的技术方案还是我写的工具，要实现国际化，核心思路是一样的，只是具体实现每个部分的手段会不一样。

我们可以把实现国际化的手段分为四部分：

1. 收集词条

2. 翻译词条

3. 国际化语言切换

4. 源码替换

## 收集词条 & 翻译词条

实现国际化，首先需要知道我们的网站有什么东西需要进行翻译的。例如我们网站上所有的中文都要实现国际化，需要翻译成英文、法文、德文等。我们就需要提前准备一份中文、英文、法文、德文的词条配置文件，在用户需要展示什么语言的时候，就读取对应的配置文件。

所以实现国际化的第一步，就是要把你项目代码里的所有中文先收集起来生成一份中文配置表文件，然后把你所需要国际化的语言按照这份中文表进行翻译，分别生成各语言配置表文件。

词条表文件的格式一般为：

```json
{
  "key": "value"
}
```

在上面的 json 中在，value 为词条，key 为该词条对应的编号。

# i18n 实现

接下来我们来一步一步实现一个简单的自动化的工具，这里主要是提供一个思路，并没有完整实现。

## babel 收集词条

这里考虑到使用 babel 的话主要是考虑到可以随意迁移，可以放在任何一个前端项目中使用。

在这里 babel 主要做的事情是通过它来读取 jsx 文件，并利用 babel 极其插件系统对其进行处理和转换，如下代码所示：

```js
const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");
const myPlugin = require("./plugin");

const filename = path.join(__dirname, "src", "index.jsx");

// 读取文件内容
const code = fs.readFileSync(filename, "utf8");

babel.transform(
  code,
  {
    filename,
    presets: ["@babel/preset-react"],
    plugins: [myPlugin],
  },
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);
```
在上面我们有一个自定义的插件：

```js

```