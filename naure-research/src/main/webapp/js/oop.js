function extend(subc, superc) {
    if (!superc || !subc) {
        throw new Error("extend failed, please check that " + "all dependencies are included.");
    }
    var F = function () {
    };
    F.prototype =  new superc();
    subc.prototype = new F();
    subc.prototype.constructor = subc;
    subc.superclass = F.prototype;
}
