const { SyncWaterfallHook } = require("tapable");


const syncWaterfallHook = new SyncWaterfallHook(["msg"]);

syncWaterfallHook.tap("syncWaterfallHook", (arg) => {
  console.log(`arg: ${arg}`)
  return arg + "b";
});

syncWaterfallHook.tap("syncWaterfallHook", (arg) => {
  console.log(`arg: ${arg}`)
  return arg + "c";
});

console.log(syncWaterfallHook.call("a"))
