
var overlayNodes = {
    'Session': function () {
        $('article section:eq(1)').xmlAcquire({
            xmlUrl: '/diagnostic/session.xml',
            xslUrl: '/xsl/table.xsl'
        });
    },
    'Analysis': function () {
        alert("A Analysis");
    }
}

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('article section:eq(0)').message({placement:'append'});
    $('aside').overlay({
        nodes:overlayNodes
    });
});

/*-------------------- 初始化 END --------------------*/