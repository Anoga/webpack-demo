const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');
runLoaders(
    {
        resource: path.resolve(__dirname, './src/demo.txt'),
        context: { minimize: true },
        loaders: [
            path.resolve(__dirname, './loaders/b-sync-loader.js'),
            path.resolve(__dirname, './loaders/c-sync-loader.js'),
        ],
        readResource: fs.readFile.bind(fs)
    },
    (err, result) => { err ? console.error(err) : console.log(result) }
)