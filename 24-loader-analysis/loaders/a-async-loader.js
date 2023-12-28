const fs = require('fs');
const path = require('path');
module.exports = function (content, map, meta) {
    console.log('a-async-loader is excuted');
    console.log('a-async-loader option-query is', JSON.stringify(this.query));
    console.log('a-async-loader options is', JSON.stringify(this.getOptions()));
    const callback = this.async();
    this.addDependency(path.join(__dirname, 'async2a-async-loader.txt'));
    fs.readFile(path.join(__dirname, 'async2a-async-loader.txt'), (err, data) => {
        const json = JSON.stringify({
            text: content.concat(`a-async-loader!${data}`).replace("hello world", "hello webpack")
        })
        this.emitFile('a-async-loader.json', json);
        callback(null, `export default ${json}`)
    });
}
