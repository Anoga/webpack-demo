module.exports = function (content, map, meta) {
    console.log('b-sync-loader is excuted');
    return content.concat("b-sync-loader!");
}