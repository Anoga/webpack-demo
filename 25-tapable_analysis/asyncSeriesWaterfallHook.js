const { AsyncSeriesWaterfallHook } = require('tapable');
//tapPromise + promise
const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['arg']);

asyncSeriesWaterfallHook.tapPromise('asyncSeriesWaterfallHook', (arg) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`arg: ${arg}`)
            resolve(arg + "b");
        }, 2000)
    })
});

asyncSeriesWaterfallHook.tapPromise('asyncSeriesWaterfallHook', (arg) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`arg: ${arg}`)
            resolve(arg + "c");
        }, 2000)
    })
});

console.time('cost1');
asyncSeriesWaterfallHook.promise('a').then(res => {
    console.log(res)
    console.timeEnd('cost1')
});

//tapAsync + callAsync
const asyncSeriesWaterfallHook2 = new AsyncSeriesWaterfallHook(['arg']);

asyncSeriesWaterfallHook2.tapAsync('asyncSeriesWaterfallHook2', (arg, callback) => {
    setTimeout(() => {
        console.log(`arg2: ${arg}`)
        callback(null, arg + "b");
    }, 2000)
});

asyncSeriesWaterfallHook2.tapAsync('asyncSeriesWaterfallHook2', (arg, callback) => {
    setTimeout(() => {
        console.log(`arg2: ${arg}`)
        callback(null, arg + "c");
    }, 2000)
});

console.time('cost2');
asyncSeriesWaterfallHook2.callAsync('a', (_, res) => {
    console.log(res)
    console.timeEnd("cost2");
});