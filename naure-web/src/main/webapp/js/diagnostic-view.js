
var overlayNodes = {
    'session': function () {
        alert("session");
    },
    'A Analysis': function () {
        alert("A Analysis");
    }
}

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('article section:eq(0)').message({placement:'append'});
    $.overlay({
        //nodes:new Array('Dynamic Programming', 'Longest Common Subsequence', 'Greedy Algorithms', 'Amortized Analysis'),
        nodes:overlayNodes
    });
});

/*-------------------- 初始化 END --------------------*/