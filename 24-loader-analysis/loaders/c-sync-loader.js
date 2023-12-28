module.exports = function (content, map, meta) {
    console.log('c-sync-loader is excuted');
    this.callback(null, content.concat("c-sync-loader!"));
}