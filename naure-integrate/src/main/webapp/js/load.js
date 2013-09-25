var load = {
    menuTemplate: "",
    css: {dom: "",
        hrefs: [
            "/css/global.css",
            "/css/modern.css"
        ]
    },
    script: {
        srcs: [
            "/js/require.js",
            "/js/require.config.js"
        ]
    }
};

var scripts = document.getElementsByTagName("script");
var params = scripts[scripts.length - 1].getAttribute('data');

if ("css" == params)
    for (var index in load.css.hrefs) {
        document.write("<link href=" + load.css.hrefs[index] + " rel=\"stylesheet\" type=\"text/css\"/>");
    }

if ("script" == params)
    for (var index in load.script.srcs) {
        document.write("<script type=\"text/javascript\" src=\"" + load.script.srcs[index] + "\"></script>");
    }
