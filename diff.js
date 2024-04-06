function findDifferences(obj1, obj2) {
  const differences = {};

  // 检查第一个对象中的每个键
  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        // 如果两个属性都是对象，则递归比较
        const diff = findDifferences(obj1[key], obj2[key]);
        if (Object.keys(diff).length > 0) {
          differences[key] = diff;
        }
      } else if (obj1[key] !== obj2[key]) {
        // 如果值不同，则记录差异
        differences[key] = { oldValue: obj1[key], newValue: obj2[key] };
      }
    } else {
      // 如果在第二个对象中不存在，则记录为已删除
      differences[key] = { oldValue: obj1[key], newValue: undefined };
    }
  });

  // 检查第二个对象中是否有新增的键
  Object.keys(obj2).forEach((key) => {
    if (!obj1.hasOwnProperty(key)) {
      differences[key] = { oldValue: undefined, newValue: obj2[key] };
    }
  });

  return differences;
}

// 示例用法
const obj1 = { a: 1, b: { c: 3, d: 4 }, e: 5 };
const obj2 = { a: 1, b: { c: 3, d: 5 }, f: 6 };

console.log(findDifferences(obj1, obj2));
