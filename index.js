const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");
const myPlugin = require("./plugin");

const filename = path.join(__dirname, "src", "index.jsx");

// 读取文件内容
const code = fs.readFileSync(filename, "utf8");

// 使用Babel API和你的插件转换代码
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
