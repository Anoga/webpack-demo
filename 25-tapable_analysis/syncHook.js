const { SyncHook } = require('tapable');

const syncHook = new SyncHook(['name', 'age']);

syncHook.tap('syncHook', (name, age) => {
    console.log(name, age)
});

syncHook.call('zhangsan', 18);