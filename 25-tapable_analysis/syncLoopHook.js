const { SyncLoopHook } = require("tapable");

const syncLoopHook = new SyncLoopHook();

let timesA = 0;
let timesB = 0;
let timesC = 0;

syncLoopHook.tap("syncLoopHook", () => {
    ++timesA;
    console.log(`第 ${timesA} 次执行回调A`);
})

syncLoopHook.tap("syncLoopHook", () => {
    ++timesB;
    console.log(`第 ${timesB} 次执行回调B`);
    if (timesB < 2) {
        return false;
    }
})

syncLoopHook.tap("syncLoopHook", () => {
    ++timesC;
    console.log(`第 ${timesC} 次执行回调C`);
    if (timesC < 2) {
        return false;
    }
})

syncLoopHook.call()

