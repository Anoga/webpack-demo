const { SyncLoopHook } = require("tapable");

const syncLoopHook = new SyncLoopHook(["name"]);

let timesA = 0;
let timesB = 0;
let timesC = 0;
let timesCall = 0;
let timesRegister = 0;
let timesTap = 0;
let timesLoop = 0;
syncLoopHook.tap("syncLoopHook_step1", (name) => {
    ++timesA;
    console.log(`第 ${timesA} 次执行回调A`);
})

syncLoopHook.tap("syncLoopHook_step2", (name) => {
    ++timesB;
    console.log(`第 ${timesB} 次执行回调B`);
    if (timesB < 2) {
        return false;
    }
})

syncLoopHook.tap("syncLoopHook_step3", (name) => {
    ++timesC;
    console.log(`第 ${timesC} 次执行回调C`);
    if (timesC < 2) {
        return false;
    }
})

syncLoopHook.intercept({
    call: (name) => {
        ++timesCall
        console.log("intercept_call_name:", name)
        console.log("intercept_call_times:", timesCall)
    },
    loop: (name) => {
        ++timesLoop
        console.log("intercept_loop_name:", name)
        console.log("intercept_loop_times:", timesLoop)
    },
    tap: (tapInfo) => {
        ++timesTap
        console.log("intercept_tap_tapName:", tapInfo.name)
        console.log("intercept_tap_times:", timesTap)
    },
    register: (tapInfo) => {
        ++timesRegister
        console.log("intercept_register_tapName:", tapInfo.name)
        console.log("intercept_register_times:", timesRegister)
        tapInfo.name = "register_" + tapInfo.name
        return tapInfo
    }
})

syncLoopHook.call("zhangsan")