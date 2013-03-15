var load = {
    menuTemplate: "",
    css: {dom: "",
        hrefs: [
            "/Research/projects/research/naure-integrate/src/main/webapp/css/global.css",
            "/Research/projects/research/naure-integrate/src/main/webapp/css/modern.css"
        ]
    },
    script: {
        srcs: [
            "/Research/projects/research/naure-integrate/src/main/webapp/js/require.js",
            "/Research/projects/research/naure-integrate/src/main/webapp/js/require.config.js"
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
