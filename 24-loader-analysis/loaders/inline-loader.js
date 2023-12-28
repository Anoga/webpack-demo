module.exports =  function (content, map, meta) {
    console.log('inline-Loader is excuted');
    console.log('inline-Loader inline-query is', JSON.stringify(this.query));
    console.log('inline-Loader options is', JSON.stringify(this.getOptions()));
    const json = JSON.stringify(content);
    return `export default ${json.replace("hello world", "hello inline-loader")}`;
}
