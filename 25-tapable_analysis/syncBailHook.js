const { SyncBailHook } = require("tapable");


const syncBailHook = new SyncBailHook();

syncBailHook.tap('syncBailHook', (name, age) => {
    console.log("callback A");
  return 'stop callback'
});

syncBailHook.tap('syncBailHook', (name, age) => {
    console.log("callback B");
});

console.log(syncBailHook.call())


