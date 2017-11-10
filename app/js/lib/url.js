module.exports = function(config){
    var tietukuUrl = config.tietukuUrl;
    var baiduUrl = config.baiduUrl;
    return {
        file:{
            upload:tietukuUrl
        },
        img:{
            search:baiduUrl + '/n/pc_search'
        }
    }
};