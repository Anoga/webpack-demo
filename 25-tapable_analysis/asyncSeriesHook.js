
const { AsyncSeriesHook } = require('tapable');
//tapPromise + promise
const asyncSeriesHook = new AsyncSeriesHook(['name', 'age', 'duration']);

asyncSeriesHook.tapPromise('asyncSeriesHook', (name, age, duration) => {
    let err = Math.floor(Math.random() * 10) < 5 ? "error in step1" : "";
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step1:", name, age);
            if (err) reject(err)
            resolve();
        }, duration)
    })
});

asyncSeriesHook.tapPromise('asyncSeriesHook', (name, age, duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step2:", name, age);
            resolve("no care result");
        }, duration)
    })
});

console.time('cost1');
asyncSeriesHook.promise('zhangsan', 18, 2000).then(
    res => {
        if (res) console.log(res)
        console.timeEnd('cost1')
    },
    err => {
        console.log(err)
        console.timeEnd('cost1')
    }
);

//tapAsync + callAsync
const asyncSeriesHook2 = new AsyncSeriesHook(['name', 'age', 'duration']);

asyncSeriesHook2.tapAsync('asyncSeriesHook2', (name, age, duration, callback) => {
    let err = Math.floor(Math.random() * 10) < 5 ? "error in step1" : "";
    setTimeout(() => {
        console.log("step1:", name, age);
        if (err) return callback(err)
        callback();
    }, duration)
});

asyncSeriesHook2.tapAsync('asyncSeriesHook2', (name, age, duration, callback) => {
    setTimeout(() => {
        console.log("step2:", name, age);
        callback(null, "no care result");
    }, duration)
});

console.time('cost2');

asyncSeriesHook2.callAsync('lisi', 18, 2000, (err, res) => {
    if (err) console.error(err)
    if (res) console.log(res)
    console.timeEnd("cost2");
});