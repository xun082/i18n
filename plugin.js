const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const i18nFilePath = path.join(__dirname, "i18n.json"); // 调整路径以适应您的项目结构

// 加载或初始化i18n数据
let i18nData = {};
if (fs.existsSync(i18nFilePath)) {
  i18nData = JSON.parse(fs.readFileSync(i18nFilePath, "utf8"));
}

function saveString(chineseText) {
  // 使用md5生成一个基于中文文本的短哈希值作为键名
  const hash = crypto.createHash("md5").update(chineseText).digest("hex");
  const key = `key_${hash.substring(0, 8)}`;

  // 检查并初始化'en'键
  if (!i18nData["en"]) {
    i18nData["en"] = {};
  }

  // 保存或更新英文翻译（在这里，我们简单地使用中文文本作为“翻译”的占位符）
  if (!i18nData["en"][key]) {
    i18nData["en"][key] = chineseText;
    fs.writeFileSync(i18nFilePath, JSON.stringify(i18nData, null, 2), "utf8");
  }
}

module.exports = function () {
  return {
    visitor: {
      JSXText(path) {
        const chineseRegex = /[\u4e00-\u9fa5]/;
        if (chineseRegex.test(path.node.value.trim())) {
          const textValue = path.node.value.trim();
          saveString(textValue); // 保存字符串并按指定格式存储
        }
      },
    },
  };
};
