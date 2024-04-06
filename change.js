const fs = require("fs");
const path = require("path");

// 加载i18n数据
const i18nFilePath = path.join(__dirname, "i18n.json");
const i18nData = JSON.parse(fs.readFileSync(i18nFilePath, "utf8"));

// 文件路径
const jsxFilePath = path.join(__dirname, "src", "index.jsx");
let fileContent = fs.readFileSync(jsxFilePath, "utf8");

// 替换中文字符串为i18n变量
Object.entries(i18nData["en"]).forEach(([key, value]) => {
  const regex = new RegExp(value, "g");
  fileContent = fileContent.replace(regex, `{i18n.${key}}`);
});

// 保存修改后的文件内容
// 考虑写入到一个新文件而不是覆盖原文件，以避免数据丢失
const newJsxFilePath = path.join(__dirname, "src", "Index.i18n.jsx");
fs.writeFileSync(newJsxFilePath, fileContent, "utf8");
