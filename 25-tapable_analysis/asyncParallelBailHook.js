
const { AsyncParallelBailHook } = require('tapable');
const asyncParallelBailHook = new AsyncParallelBailHook([]);

asyncParallelBailHook.tapAsync('asyncParallelBailHook', (callback) => {
    const duration = Math.floor(Math.random() * 5000)
    setTimeout(() => {
        console.log("step1 cost time:", duration)
        callback();
    }, duration)
});

asyncParallelBailHook.tapAsync('asyncParallelBailHook', (callback) => {
    const duration = Math.floor(Math.random() * 5000)
    setTimeout(() => {
        console.log("step2 cost time:", duration)
        callback(null, "bail in step2");
    }, duration)
});

asyncParallelBailHook.tapAsync('asyncParallelBailHook', (callback) => {
    const duration = Math.floor(Math.random() * 5000)
    setTimeout(() => {
        console.log("step3 cost time:", duration)
        callback();
    }, duration)
});

console.time('cost');
asyncParallelBailHook.promise().then(
    res => {
        if (res) console.log(res)
        console.timeEnd('cost')
    },
    err => {
        if (err) console.log(err)
        console.timeEnd('cost')
    });