
const { AsyncSeriesBailHook } = require('tapable');
//tapPromise + promise
const asyncSeriesBailHook = new AsyncSeriesBailHook(['name', 'age', 'duration']);

asyncSeriesBailHook.tapPromise('asyncSeriesBailHook', (name, age, duration) => {
    let err = Math.floor(Math.random() * 10) < 5 ? "error in step1" : "";
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step1:", name, age);
            if (err) reject(err)
            resolve();
        }, duration)
    })
});

asyncSeriesBailHook.tapPromise('asyncSeriesBailHook', (name, age, duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step2:", name, age);
            resolve("bail in step2");
        }, duration)
    })
});

asyncSeriesBailHook.tapPromise('asyncSeriesBailHook', (name, age, duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("step3:", name, age);
            resolve();
        }, duration)
    })
});

console.time('cost1');
asyncSeriesBailHook.promise('zhangsan', 18, 2000).then(
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
const asyncSeriesBailHook2 = new AsyncSeriesBailHook(['name', 'age', 'duration']);

asyncSeriesBailHook2.tapAsync('asyncSeriesBailHook2', (name, age, duration, callback) => {
    let err = Math.floor(Math.random() * 10) < 5 ? "error in step1" : "";
    setTimeout(() => {
        console.log("step1:", name, age);
        if (err) return callback(err)
        callback();
    }, duration)
});

asyncSeriesBailHook2.tapAsync('asyncSeriesBailHook2', (name, age, duration, callback) => {
    setTimeout(() => {
        console.log("step2:", name, age);
        callback(null, "bail in step2");
    }, duration)
});

asyncSeriesBailHook2.tapAsync('asyncSeriesBailHook2', (name, age, duration, callback) => {
    setTimeout(() => {
        console.log("step3:", name, age);
        callback();
    }, duration)
});

console.time('cost2');

asyncSeriesBailHook2.callAsync('lisi', 18, 2000, (err, res) => {
    if (err) console.error(err)
    if (res) console.log(res)
    console.timeEnd("cost2");
});