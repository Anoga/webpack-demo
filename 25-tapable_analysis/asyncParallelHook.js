
const { AsyncParallelHook } = require('tapable');
const asyncParallelHook = new AsyncParallelHook([]);

asyncParallelHook.tapPromise('asyncParallelHook', () => {
    const duration = Math.floor(Math.random() * 5000)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step1 cost time:", duration)
            resolve();
        }, duration)
    })
});

asyncParallelHook.tapPromise('asyncParallelHook', () => {
    const duration = Math.floor(Math.random() * 5000)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step2 cost time:", duration)
            resolve("no care result");
        }, duration)
    })
});

console.time('cost');
asyncParallelHook.promise().then(res => {
    if (res) console.log(res)
    console.timeEnd('cost')
});