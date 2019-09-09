// Tree Shaking 每个js都是一个模块，无需倒入没有用到的js代码
// Tree Shaking 只支持 ES module静态方法，  不支持require，commonjs动态方法
export const add = (a, b) => {
    console.log(a + b);
}

export const minus = (a, b) => {
    console.log(a - b);
}