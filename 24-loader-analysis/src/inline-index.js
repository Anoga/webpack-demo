import json from '!../loaders/inline-loader?name=inline-loader!./demo.inline';
console.log(JSON.parse(json).text);