/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 11:00 AM
 * Description:
 *
 */

define(['jquery', 'naure', 'math'], function ($, NAURE) {
    NAURE.Graph.Math = (function () {

        var mathutil = {
            level:0,
            eqtype:{"product":1, "sum":2, "number":3, "discretevector":6, "continuousvector":7, "power":8, "fn":9, "fraction":10, "derivative":11, "integral":12, "equality":13, "pm":14, "operatorfactor":15, "lessthan":16, "greaterthan":17, "range":18},
            latexchars:{
                'gt':">",
                "left|":"abs:(",
                "right|":")",
                "cosh":"cosh",
                "sinh":"sinh",
                "tanh":"tanh",
                "coth":"coth",
                "sech":"sech",
                "csch":"csch",
                "cosech":"cosech",
                "sin":"sin:",
                "cos":"cos:",
                "tan":"tan:",
                "times":"*",
                "sec":"sec:",
                "cosec":"cosec:",
                "csc":"csc:",
                "cotan":"cotan:",
                "cot":"cot:",
                "ln":"ln:",
                "lg":"log:",
                "log":"log:",
                "det":"det:",
                "dim":"dim:",
                "max":"max:",
                "min":"min:",
                "mod":"mod:",
                "lcm":"lcm:",
                "gcd":"gcd:",
                "gcf":"gcf:",
                "hcf":"hcf:",
                "lim":"lim:",
                ":":"",
                "left(":"(",
                "right)":")",
                "left[":"[",
                "right]":"]",
                'ge':">=",
                'lt':"<",
                'le':"<=",
                "infty":"∞",
                "cdot":"*",
                "text":"",
                "frac":"",
                "backslash":"\\",
                "alpha":"α",
                "beta":"β",
                'gamma':"γ",
                'delta':"δ",
                'zeta':"ζ",
                'eta':"η",
                'theta':"θ",
                'iota':"ι",
                'kappa':"κ",
                'mu':"μ",
                'nu':"ν",
                'xi':"ξ",
                'omicron':"ο",
                'rho':"ρ",
                'sigma':"σ",
                'tau':"τ",
                'upsilon':"υ",
                'chi':"χ",
                'psi':"ψ",
                'omega':"ω",
                'phi':"ϕ",
                "phiv":"φ",
                "varphi":"φ",
                "epsilon":"ϵ",
                "epsiv":"ε",
                "varepsilon":"ε",
                "sigmaf":"ς",
                "sigmav":"ς",
                "gammad":"ϝ",
                "Gammad":"ϝ",
                "digamma":"ϝ",
                "kappav":"ϰ",
                "varkappa":"ϰ",
                "piv":"ϖ",
                "varpi":"ϖ",
                "pm":"±",
                "rhov":"ϱ",
                "varrho":"ϱ",
                "thetav":"ϑ",
                "vartheta":"ϑ",
                "pi":"π",
                "lambda":"λ",
                'Gamma':"Γ",
                'Delta':"Δ",
                'Theta':"Θ",
                'Lambda':"Λ",
                'Xi':"Ξ",
                'Pi':"Π",
                'Sigma':"Σ",
                'Upsilon':"Υ",
                'Phi':"Φ",
                'Psi':"Ψ",
                'Omega':"Ω",
                "perp":"⊥",
                ",":" ",
                "nabla":"∇",
                "forall":"∀",
                "sum":"∑",
                "summation":"∑",
                "prod":"∏",
                "product":"∏",
                "coprod":"∐",
                "coproduct":"∐",
                "int":"∫",
                "integral":"∫"
            },

            p:function () {
                if (typeof inp == "number" || !isNaN(inp)) {
                    return Number(inp);
                } else if (typeof inp == "object") {
                    if (!isNaN(inp)) {
                        app.ui.console.warn("this is returned somewhere instead of Number(this)");
                        return Number(inp);
                    }
                    return inp;
                }
                if (inp == "" || inp === undefined) {
                    return 0;
                }
//parses brackets recursively and returns an expression

                //level++;
                //if(level>15){throw("too recursive for debugging");return;}
                //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"p: "+inp);
                var eq = [];
                var e = inp.replace(/\s/g, "").replace(/\]/g, ")").replace(/\[/g, "(").replace(/\)\(/g, ")*(");

                //TODO: known functions only, otherwise make it a product
                //TODO: allow things like 2x

                while (e.indexOf("xx") != -1) {
                    e = e.replace(/xx/g, "x*x");
                }

                //TODO: -- -> +
                e = e.replace(/∞/g, "Infinity");
                e = e.replace(/\.([^\d]|$)/g, "*$1");
                e = e.replace(/([\d]+(\.[\d]+)?)([^\+\-\*\/\^\:\(\)\d\=\<\>\.!])/g, "$1*$3");

                //TODO: Following line is a bit hacky. Specifications need be made to clear things up.
                e = e.replace(/([xyzπϕ])([exyzπϕ])/g, "$1*$2");

                e = e.replace(/\^([\d]+)\(/g, "^$1:(");

                e = e.replace(/max\(/g, "(max)(");

                e = e.replace(/([xyzπϕ\d∫])\(/g, "$1*(");
                e = e.replace(/\(max\)/g, "max");

                e = e.replace(/∫([^\*])/g, "∫*$1");
                e = e.replace(/([xyzπϕ\d\.])∫/g, "$1*∫");
                e = e.replace(/([^\+\-\*\/\^\:\(\)\d\=\<\>])\(/g, "$1:(");

                e = e.replace(/\)([^\+\-\*\/\^\:\(\)\=\<\>!])/g, ")*$1");
                //multiplicative identity
                e = e.replace(/\*([\)\=]|$)/g, "$1");
                //Double factorial
                e = e.replace(/!!/g, "‼");
                if (e.indexOf("=") != -1) {
                    var eq = e.replace("==", "[equals][equals]").split("=").map(function (e) {
                        return e.replace("[equals][equals]", "==");
                    });
                    if (eq.length == 2) {
                        return [p(eq[0]), p(eq[1])].setType(eqtype.equality);
                    }
                    throw("Too many '='s");
                    return;
                } else if (e.indexOf("<") != -1) {
                    var eq = e.split("<");
                    if (eq.length == 2) {
                        return [p(eq[0]), p(eq[1])].setType(eqtype.lessthan);
                    }
                    throw("Too many '<'s");
                    return;
                } else if (e.indexOf(">") != -1) {
                    var eq = e.split(">");
                    if (eq.length == 2) {
                        return [p(eq[0]), p(eq[1])].setType(eqtype.greaterthan);
                    }
                    throw("Too many '>'s");
                    return;
                }
                //---Recursive Parentheses parse
                while ((e.indexOf("(") != -1) && (e.indexOf(")") != -1)) {
                    var fail = true;
                    e = e.replace(/\([^\(\)]*\)/g, function (n) {
                        fail = false;
                        var h = random_hash();
                        obj[h] = p(n.substring(1, n.length - 1));
                        return "aaaa" + h + "aaaa";
                    });
                    if (fail) {
                        throw (MessageStrings.parentheses);
                        break;
                    }
                }
                var terms = [];
                var last = 0;
                //---Sum parse
                var term_op = "+-";
                var prod_op = "*/";

                if (e.indexOf(",") != -1) {
                    //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"f>: "+e);
                    terms.type = eqtype.discretevector;
                    var be = e.split(",");
                    be.forEach(function (zz) {
                        terms.push(p(zz));
                    });

                } else if ((e.indexOf("+") != -1) || (e.indexOf("-") != -1)) {
                    //__debug(!__debug_parser,0) ||app.ui.console.log(spaces.substring(0,level)+"+>: "+e);
                    terms.type = eqtype.sum;
                    var nextisinverse = false;
                    for (var i = 0; i < e.length; i++) {
                        if (term_op.indexOf(e[i]) != -1) {
                            var s = e.substring(last, i);
                            if (nextisinverse) {
                                terms.push(p(s).multiply(-1));
                                nextisinverse = false;
                            } else {
                                terms.push(p(s));
                            }
                            if (e[i] == "-") {
                                nextisinverse = true;
                            }
                            last = i + 1;
                        }
                    }
                    if (nextisinverse) {
                        terms.push(p(e.substring(last, e.length)).multiply(-1));
                    } else {
                        terms.push(p(e.substring(last, e.length)));
                    }


                } else if ((e.indexOf("*") != -1) || (e.indexOf("/") != -1)) {
                    //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"*>: "+e);
                    terms.type = eqtype.product;
                    var denom = [];
                    denom.type = eqtype.product;
                    var nextisinverse = false;
                    //check for d/dx
                    for (var i = 0; i < e.length; i++) {
                        if (prod_op.indexOf(e[i]) != -1) {
                            var s = e.substring(last, i);
                            if (nextisinverse) {
                                denom.push(p(s));
                                nextisinverse = false;
                            } else {
                                terms.push(p(s));
                            }
                            if (e[i] == "/") {
                                nextisinverse = true;
                            }
                            last = i + 1;
                        }
                    }
                    if (nextisinverse) {
                        denom.push(p(e.substring(last, e.length)));
                    } else {
                        terms.push(p(e.substring(last, e.length)));
                    }
                    if (denom.length) {
                        terms = [terms, denom];
                        terms.type = eqtype.fraction;
                    }
                } else if (e.indexOf("!") != -1) {

                    //TODO: Fix this
                    //DONE: This was fixed March 16, 2011
                    terms.type = eqtype.product;
                    var last = 0;
                    for (var i = 0; i < e.length; i++) {
                        if (e[i] == "!") {
                            var s = e.substring(last, i);
                            if (s == "") {
                                terms[terms.length - 1] = ["fact", terms[terms.length - 1]].setType(eqtype.fn);
                            } else {
                                terms.push(["fact", p(s)].setType(eqtype.fn));
                            }
                            last = i + 1;
                        }
                    }
                    var final = e.substring(last, e.length);
                    if (final != "") {
                        terms.push(p(final));
                    }

                } else if (e.indexOf("‼") != -1) {

                    //TODO: Fix this
                    //DONE: This was fixed March 16, 2011
                    terms.type = eqtype.product;
                    var last = 0;
                    for (var i = 0; i < e.length; i++) {
                        if (e[i] == "‼") {
                            var s = e.substring(last, i);
                            if (s == "") {
                                terms[terms.length - 1] = ["doublefact", terms[terms.length - 1]].setType(eqtype.fn);
                            } else {
                                terms.push(["doublefact", p(s)].setType(eqtype.fn));
                            }
                            last = i + 1;
                        }
                    }
                    var final = e.substring(last, e.length);
                    if (final != "") {
                        terms.push(p(final));
                    }

                } else if (e.indexOf(":") != -1) {
                    //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"f>: "+e);
                    terms.type = eqtype.fn;
                    var be = e.split(":");
                    if (be.length != 2) {

                        //alert(e);
                        throw (MessageStrings.functionchain);
                        //return;
                    }
                    var dmatch = /^([^\']+)(\'+)$/.exec(be[0]);
                    if (dmatch) {
                        //console.log("found");
                        terms.type = eqtype.fn;
                        var b = [dmatch[1], be[1]].setType(eqtype.fn);
                        for (var count = dmatch[2].length; count--; count > 0) {
                            //console.log("diff");
                            b = ["diff", b].setType(eqtype.fn);
                        }
                        terms = b;

                    } else {
                        var match = /^log_([\d\.\+\-e]+)$/.exec(be[0]);
                        if (match) {
                            var fn_ = ["log", p(be[1])].setType(eqtype.fn);
                            terms.type = eqtype.fraction;
                            terms.push(fn_);
                            terms.push(["log", p(match[1])].setType(eqtype.fn));
                        } else {
                            var fname = p(be[0]);
                            if (fname.type == eqtype.power) {
                                var basefn = fname[0].simplify();
                                var power = fname[1].simplify();
                                //if trig
                                if (power < 0) {
                                    //find inverse
                                    basefn = "a" + basefn;
                                    power = -power;
                                }

                                if (1 || is_it_a_trig_function) {
                                    terms.type = eqtype.power;
                                    terms.push([basefn, p(be[1])].setType(eqtype.fn));
                                    terms.push(power);
                                }


                            } else if (typeof fname != "string") {
                                terms.type = eqtype.product;
                                terms.push(fname);
                                terms.push(p(be[1]));
                            } else {
                                terms.push(fname);
                                terms.push(p(be[1]));
                            }
                        }
                    }
                } else if (e.indexOf("^") != -1) {
                    //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"^>: "+e);

                    var be = e.split("^");
                    //NOTE: for now
                    //^ is a BINARY operator that goes from right to left.
                    //  1^2^3 = 1^(2^(3))
                    if (be.length != 2) {
                        throw (MessageStrings.expchain);
                        return;
                    }
                    var base = p(be[0]);
                    terms.type = eqtype.power;
                    terms.push(base);
                    terms.push(p(be[1]));


                } else {
                    var parsednumber = NaN;
                    if (!isNaN(parsednumber = Number(e))) {
                        return parsednumber;
                    } else if (!/^aaaa[a-z\d]{20}aaaa$/.test(e)) {
                        var match = /^([\d]+(\.[\d])?)([^\d]+)$/.exec(e);
                        if (match) {
                            alert("old code: " + e);
                            terms.type = eqtype.product;
                            terms.push(p(match[1]));
                            terms.push(match[3]);
                        } else {
                            var vars = e.split(".");
                            if (vars.length > 1) {
                                terms.type = eqtype.product;
                                vars.forEach(function (v) {
                                    terms.push(p(v));
                                });
                            } else {
                                return e;
                            }
                        }
                    } else {
                        terms.type = eqtype.variable;
                        terms.push(e);
                    }


                }

                terms = terms.dreplace(/^aaaa[a-z\d]{20}aaaa$/, function (e) {
                    var to_ret = obj[e.substring(4, 24)];
                    delete obj[e.substring(4, 24)];
                    return to_ret;
                });
                /*
                 for(var i=0;i<terms.length;i++){
                 if(/^aaaa[a-z\d]{20}aaaa$/.test(terms[i])){
                 terms[i]=obj[terms[i].substring(4,24)];
                 //terms[i]="e";
                 }
                 }*/
                //__debug(!__debug_parser,0) || app.ui.console.log(spaces.substring(0,level)+"@>: "+JSON.stringify(terms));
                level--;
                while (typeof terms == "object" && terms.type == eqtype.variable) {
                    terms = terms[0];
                }
                if (terms.length == 2) {

                    //terms=terms.simplify();
                    if (terms.length == 2 && terms.type == eqtype.fraction && terms[0].simplify() == "d" && terms[1].simplify() == "dx") {
                        return ["diff"].setType(eqtype.operatorfactor);
                    }
                    /*if(terms.length==2 && terms.type==eqtype.fraction && terms[0]=="d" && terms[1]=="dx"){
                     return ["diff"].setType(eqtype.operatorfactor);
                     }*/
                    if (terms[0].length == 1 && terms[0] == "d" && terms[1].length == 1 && terms[1] == "dx") {
                        return ["diff"].setType(eqtype.operatorfactor);
                    }
                }
                //console.log(terms.type+": "+terms.getString());
                if (terms.type == eqtype.product) {
                    var found = [];
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i].type == eqtype.operatorfactor) {
                            var operation = terms.splice(i, 1)[0][0];
                            found.push(operation);
                            var subject = terms.splice(i).setType(eqtype.product);
                            if (terms.length) {
                                return [operation, subject].setType(eqtype.fn).multiply(terms);
                            } else {
                                return [operation, subject].setType(eqtype.fn);
                            }
                        } else if (terms[i] == "∫") {
                            var operation = terms.splice(i, 1)[0];
                            found.push(operation = "int");
                            var subject = terms.splice(i).setType(eqtype.product);
                            if (terms.length) {
                                return [operation, subject].setType(eqtype.fn).multiply(terms);
                            } else {
                                return [operation, subject].setType(eqtype.fn);
                            }
                        }
                    }
                }
                //while(typeof terms=="object" && terms.length==1){
                //	terms=terms[0];
                //}
                return terms;

            },

            clean:function (n) {
                // de-latexify a string.
                n = n.replace(/\\?(sin|cos|tan|sec|cosec|csc|cotan|cot)\^([^\{]|\{[^\}]+\})/g, "$1^$2:");
                n = n.replace(/\\?(sin|cos|tan|sec|cosec|csc|cotan|cot)([^\:\^h])/g, "$1:$2");
                n = n.replace(/\\?(log)_([^\{]|\{[^\}]+\})/g, "$1_$2:");
                for (var i in this.latexchars) {
                    if (this.latexchars.hasOwnProperty(i)) {
                        while (n.indexOf("\\" + i) != -1) {
                            n = n.replace("\\" + i, latexchars[i]);
                        }
                    }
                }
                return n.replace(/\*\(\)/g, "*(1)").replace(/\{ \}/g, "{1}").replace(/_\{([^\}\{]+)\}/g, "_$1").replace(/\}\{/g, ")/(").replace(/\}/g, "))").replace(/\{/g, "((").replace(/\\/g, "");
            },

            compile:function (n) {
                //eq is the equation (CAS)
                var eq;
                if (typeof n == "string") {
                    //n is latex. Make it not.
                    n = this.clean(n);
                }
                eq = p(n);
                //dependence is an array of variables that eq should be updated on changes.
                var dependence = eq.dependence ? eq.dependence() : [];
                eq = eq.simplify();

                //Functions of x
                var funcs = [];

                //Functions of y
                var yfuncs = [];

                //Functions of theta
                var tfuncs = [];

                //Functions of r
                var rfuncs = [];

                //Defenitions of functions defined by the graph. i.e. "f(x)=x" will defined funcdefs.f
                var funcdefs = {};

                //Variables defined. Similar to above funcdefs.
                var vars = {};

                //Variables changed in the process of this compile()
                var changed = [];
                if (eq === undefined) {

                } else if (eq.type == eqtype.equality || eq.type == eqtype.lessthan || eq.type == eqtype.greaterthan) {
                    if (eq.type == eqtype.lessthan || eq.type == eqtype.greaterthan) {
                        eq[1] = [eq[1]].setType(eq.type);
                    }

                    if (typeof eq[0] == "string") {
                        if (eq[0] == "y") {
                            //y=f(x)

                            //TODO: check the f(y) does not depend on y.
                            funcs.push(eq[1]);
                        } else if (eq[0] == "x") {
                            //x=f(y)

                            //TODO: check the f(y) does not depend on x.
                            yfuncs.push(eq[1]);
                        } else if (dirty(eq[0]) == "theta") {
                            rfuncs.push(eq[1]);
                        } else if (dirty(eq[0]) == "r") {
                            tfuncs.push(eq[1]);
                        } else if (eq[0] != "") {
                            //a *variable* is defined by this graph. Add it to vars.
                            var varname = dirty(eq[0]);
                            vars[varname] = eq[1].eval();
                            if (isNaN(vars[varname])) {
                                throw(MessageStrings.nonconstantconstant);
                            }
                            changed.push(varname);
                        }
                    } else if (eq[0].length == 2 && eq[0].type == eqtype.fn && typeof eq[0][0] == "string" && typeof eq[0][1] == "string") {
                        //name(x)=...
                        //Add it to funcdefs.
                        var mm = eq[1].dreplace(eq[0][1], "x").simplify();
                        var jsc = mm.getString(0, true);
                        funcdefs[eq[0][0]] = new Function("x", "return " + jsc);
                        //funcdefs[eq[0][0]]=eval("("+"function(x){return "+jsc+";})");
                        funcdefs[eq[0][0]].math = mm;

                        //Trigger changes soon.
                        changed.push(eq[0][0]);

                    } else if (eq[0].search("y")) {
                        //If LHS has a y

                        try {
                            //Rearrange so that LHS=y, then push RHS to funcs.
                            funcs.push(eq[0].dreplace(/^y$/g, "x").simplify().inverses().simplify().dreplace(/x/g, eq[1].simplify()));
                        } catch (ex) {
                            //Could not rearrange.
                            //TODO: try wolfram alpha API maybe.
                            //TODO: otherwise, use a discrete/trial-and-error method.
                            throw("CAS: " + ex);
                        }
                    } else {
                        //No y on lhs.
                        //TODO: search for an x on the LHS, and do something similar to above,
                        //      but for yfuncs.

                        throw("CAS: Failure");
                    }
                } else {
                    if (eq.simplify) {
                        eq = eq.simplify();
                    }
                    funcs.push(eq);
                }

                var ret = {"f":function () {
                    throw("Not a function");
                }};

                var builder = "";//Javascript code (body) for the plot() function.

                //Create an empty vector which will contain vectors as components.
                //TODO: just use an array of vectors. Simpler.
                ret.pt = [].setType(eqtype.discretevector);

                //Singularites

                //Singularites arise from:
                // Division by zero
                //   * Logs
                // ->± Infinity
                // What else?
                var first = true;
                if (funcs.length) {
                    for (var i = 0; i < funcs.length; i++) {

                        var fn = funcs[i].simplify();

                        //Get javascript expression.
                        if (fn.type == eqtype.lessthan || fn.type == eqtype.greaterthan) {
                            var jsc = fn[0].getString(0, true);
                        } else {
                            var jsc = fn.getString(0, true);
                        }
                        if (first) {
                            ret.f = new Function("x", "return " + jsc);
                            first = false;
                        }


                        var singularities = [];
                        try {
                            var singularities = fn.singularities();

                            //We don't care about singularites way out there:
                            singularities.remove(Infinity);
                            singularities.remove(-Infinity);
                        } catch (ex) {
                            if (__debug(1, 0)) {
                                //when debugging we want to see the error
                                throw(ex);
                            }
                        }

                        //begin the path. Colour (fill and stroke) is already done for us in ui.js
                        builder += "ctx.beginPath();var x=boundleft;ctx.move(x," + jsc + ");";
                        if (0 && singularities.length) {
                            //Better plot logic.
                            //For example, this would allow us to plot y=sqrt(1-x^2) from [-1,1] exactly with no abrupt endings.

                        } else {
                            //The loop is within the function because calling a function is too slow in javascript (last time I checked)
                            //Plot each point: (jsc is the expression generated by CAS)
                            builder += "for(var x=boundleft;x<boundright;x+=(boundright-boundleft)/width){" + "ctx.line(x," + jsc + ");}ctx.stroke();";
                            if (fn.type == eqtype.greaterthan) {
                                builder += "ctx.line(boundright+2,boundtop+2);ctx.line(boundleft-2,boundtop+2);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            } else if (fn.type == eqtype.lessthan) {
                                builder += "ctx.line(boundright+2,boundbottom-2);ctx.line(boundleft-2,boundbottom-2);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            }

                            builder += "ctx.stroke();";
                        }

                        try {
                            //Find stationary points:
                            var rts = fn.differentiate().simplify().roots();
                            for (var r = 0; r < rts.length; r++) {
                                var array = [0, 0].setType(eqtype.discretevector);
                                //console.log(fn.getString());

                                array[0] = rts[r];
                                array[1] = fn.dreplace("x", array[0]).simplify();

                                ret.pt.push(array);
                            }
                        } catch (ex) {
                            if (__debug(0 && 1, 0)) {
                                throw(ex);
                            }
                        }

                        try {
                            var array = [0, 0].setType(eqtype.discretevector);
                            //console.log(fn.getString());
                            //Find y intercept(s). I.e. f(0), or just work for multi-valued functions.
                            array_math = fn.dreplace(/^x$/, 0);
                            array[1] = array_math.simplify();
                            //.getString(0,1,1);

                            ret.pt.push(array);

                            try {
                                //Find x-intercepts.
                                var rts = fn.roots();
                                for (var rid = 0; rid < rts.length; rid++) {
                                    var array = [0, 0].setType(eqtype.discretevector);
                                    array[0] = rts[rid].simplify();
                                    ;
                                    //.getString(0,1,1);
                                    ret.pt.push(array);
                                }
                            } catch (ex) {
                                //could not find roots using cas.

                                //Use wolfram alpha? (needs to be async)
                                //Use newtons method:

                            }

                            //console.log("ok");
                            //ret.xc.push(funcs[i].inverse().dreplace(/^x$/,0).simplify().simplify());
                        } catch (ex) {
                            //alert(ex);
                        }

                    }
                }

                if (yfuncs.length) {
                    for (var i = 0; i < yfuncs.length; i++) {

                        var fn = yfuncs[i].simplify();

                        //Get javascript expression.
                        if (fn.type == eqtype.lessthan || fn.type == eqtype.greaterthan) {
                            var jsc = fn[0].getString(0, true);
                        } else {
                            var jsc = fn.getString(0, true);
                        }


                        var singularities = [];
                        try {
                            var singularities = fn.singularities();

                            //We don't care about singularites way out there:
                            singularities.remove(Infinity);
                            singularities.remove(-Infinity);
                        } catch (ex) {
                            if (__debug(1, 0)) {
                                //when debugging we want to see the error
                                throw(ex);
                            }
                        }

                        //begin the path. Colour (fill and stroke) is already done for us in ui.js
                        builder += "ctx.beginPath();var y=boundbottom;ctx.move(" + jsc + ",y);";
                        if (0 && singularities.length) {
                            //Better plot logic.
                            //For example, this would allow us to plot y=sqrt(1-x^2) from [-1,1] exactly with no abrupt endings.

                        } else {
                            //The loop is within the function because calling a function is too slow in javascript (last time I checked)
                            //Plot each point: (jsc is the expression generated by CAS)
                            builder += "for(var y=boundbottom;y<boundtop;y+=(boundtop-boundbottom)/height){" + "ctx.line(" + jsc + ",y);}";
                            if (fn.type == eqtype.greaterthan) {
                                builder += "ctx.line(boundright+2,boundtop+2);ctx.line(boundright+2,boundbottom-2);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            } else if (fn.type == eqtype.lessthan) {
                                builder += "ctx.line(boundleft-2,boundtop+2);ctx.line(boundleft-2,boundbottom-2);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            }
                            builder += "ctx.stroke();";

                        }

                        try {
                            //Find stationary points:
                            var rts = fn.dreplace("y", "x").differentiate().simplify().roots();
                            for (var r = 0; r < rts.length; r++) {
                                var array = [0, 0].setType(eqtype.discretevector);
                                //console.log(fn.getString());

                                array[0] = rts[r];
                                array[1] = fn.dreplace("x", array[0]).simplify();

                                ret.pt.push(array);
                            }
                        } catch (ex) {
                            if (__debug(0 && 1, 0)) {
                                throw(ex);
                            }
                        }

                        try {
                            var array = [0, 0].setType(eqtype.discretevector);
                            //console.log(fn.getString());
                            //Find y intercept(s). I.e. f(0), or just work for multi-valued functions.
                            array_math = fn.dreplace(/^y$/, 0);
                            array[0] = array_math.simplify();
                            //.getString(0,1,1);

                            ret.pt.push(array);

                            try {
                                //Find x-intercepts.
                                var rts = fn.roots();
                                for (var rid = 0; rid < rts.length; rid++) {
                                    var array = [0, 0].setType(eqtype.discretevector);
                                    array[0] = rts[rid].simplify();
                                    ;
                                    //.getString(0,1,1);
                                    ret.pt.push(array);
                                }
                            } catch (ex) {
                                //could not find roots using cas.

                                //Use wolfram alpha? (needs to be async)
                                //Use newtons method:

                            }

                            //console.log("ok");
                            //ret.xc.push(funcs[i].inverse().dreplace(/^x$/,0).simplify().simplify());
                        } catch (ex) {
                            //alert(ex);
                        }

                    }
                }


                if (rfuncs.length) {
                    for (var i = 0; i < rfuncs.length; i++) {

                        var fn = rfuncs[i].simplify();

                        //Get javascript expression.
                        if (fn.type == eqtype.lessthan || fn.type == eqtype.greaterthan) {
                            var jsc = fn[0].getString(0, true);
                        } else {
                            var jsc = fn.getString(0, true);
                        }
                        jsc = jsc.replace(/app\.variables\[\"(x|y|z|r|theta)\"\]/g, "$1");
                        if (first) {
                            //ret.f=eval("("+"function(x){return "+jsc+";})");
                            //The first value of a multi-valued function shall be its
                            //primary value.

                            ret.f = new Function("r", "return " + jsc);
                            first = false;
                        }


                        var singularities = [];
                        try {
                            var singularities = fn.singularities();

                            //We don't care about singularites way out there:
                            singularities.remove(Infinity);
                            singularities.remove(-Infinity);
                        } catch (ex) {
                            if (__debug(1, 0)) {
                                //when debugging we want to see the error
                                throw(ex);
                            }
                        }

                        //begin the path. Colour (fill and stroke) is already done for us in ui.js
                        builder += "ctx.beginPath();var r=0;ctx.move(0,0);";
                        if (0 && singularities.length) {
                            //Better plot logic.
                            //For example, this would allow us to plot y=sqrt(1-x^2) from [-1,1] exactly with no abrupt endings.

                        } else {
                            //The loop is within the function because calling a function is too slow in javascript (last time I checked)
                            //Plot each point: (jsc is the expression generated by CAS)
                            /*
                             We want to plot all points (x,y) ∈ ([boundleft,boundright],[boundbottom,boundtop])
                             r*(sin(x),cos(y)) ∈ (r*cos[boundleft,boundright],r*sin[boundbottom,boundtop])

                             x=r.cos(f(r)), y=r.sin(f(r))


                             f(r)=acos(x/r)
                             y=r.sin(acos(x/r))
                             r=atan(y/x)

                             y=r.sin(f(atan(y/x)))
                             asin(y/r)=f(atan(y/x))
                             */
                            builder += "var rinc=(rmax-rmin)/width;for(var r=rmin;r<rmax;r+=rinc){var thtmp=(" + jsc + ");ctx.line(r*cos(thtmp),r*sin(thtmp));}";
                            if (fn.type == eqtype.greaterthan) {
                                builder += "ctx.line(boundright+2,boundtop+2);ctx.line(boundright+2,boundbottom-2);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            } else if (fn.type == eqtype.lessthan) {
                                builder += "var thtmp=(" + jsc + ")%(2*pi);if(thtmp>7*pi/4){ctx.line(boundright+2,boundbottom-2);}if(thtmp>5*pi/4){ctx.line(boundleft-2,boundbottom-2);}if(thtmp>pi/4){ctx.line(boundleft-2,boundtop+2);ctx.line(boundright+2,boundtop+2);}ctx.line(boundright+2,0);ctx.line(0,0);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            }
                            builder += "ctx.stroke();";
                        }

                    }

                }

                if (tfuncs.length) {
                    for (var i = 0; i < tfuncs.length; i++) {

                        var fn = tfuncs[i].simplify();

                        //Get javascript expression.
                        if (fn.type == eqtype.lessthan || fn.type == eqtype.greaterthan) {
                            var jsc = fn[0].getString(0, true);
                        } else {
                            var jsc = fn.getString(0, true);
                        }
                        //A little messy:
                        jsc = jsc.replace(/app\.variables\[\"(x|y|z|r|theta)\"\]/g, "$1");

                        if (first) {
                            //The first value of a multi-valued function shall be its
                            //primary value.

                            ret.f = new Function("theta", "return " + jsc);
                            first = false;
                        }


                        var singularities = [];
                        try {
                            var singularities = fn.singularities();

                            //We don't care about singularites way out there:
                            singularities.remove(Infinity);
                            singularities.remove(-Infinity);
                        } catch (ex) {
                            if (__debug(1, 0)) {
                                //when debugging we want to see the error
                                throw(ex);
                            }
                        }

                        //begin the path. Colour (fill and stroke) is already done for us in ui.js
                        builder += "ctx.beginPath();var theta=0;ctx.move(" + jsc + "*cos(theta)," + jsc + "*sin(theta));";
                        if (0 && singularities.length) {
                            //Better plot logic.
                            //For example, this would allow us to plot y=sqrt(1-x^2) from [-1,1] exactly with no abrupt endings.

                        } else {
                            //The loop is within the function because calling a function is too slow in javascript (last time I checked)
                            //Plot each point: (jsc is the expression generated by CAS)
                            /*
                             tinc: reciprcal of pixels along max *circle* (ellipse to complicated) around screen area?

                             */
                            builder += "var tinc=1/max(width,height);for(var theta=0;theta<(2*pi);theta+=tinc){var rtmp=(" + jsc + ");ctx.line(rtmp*cos(theta),rtmp*sin(theta));}ctx.line(" + jsc + ",0);";

                            if (fn.type == eqtype.greaterthan) {
                                builder += "ctx.line(boundright+2,0);ctx.line(boundright+2,boundbottom-2);ctx.line(boundleft-2,boundbottom-2);ctx.line(boundleft-2,boundtop+2);ctx.line(boundright+2,boundtop+2);ctx.line(boundright+2,0);";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            } else if (fn.type == eqtype.lessthan) {
                                builder += "var theta=0;ctx.line(" + jsc + "*cos(theta)," + jsc + "*sin(theta));";
                                builder += "ctx.globalAlpha=0.2;ctx.fill();ctx.globalAlpha=1.0;";
                            }
                            builder += "ctx.stroke()";
                        }

                    }

                }

                //Add our vars and funcdefs to the global CAS variables (app.variables)
                //TODO: should not be app, but cas.variables. (javascript-cas will support variables natively someday)
                if (window && window.app && window.app.variables) {
                    for (i in vars) {
                        if (vars.hasOwnProperty(i)) {
                            if (i == "e" || i == "pi") {
                                throw(MessageStrings.protected);
                                return;
                            }
                            window.app.variables[i] = vars[i];
                        }
                    }
                    for (i in funcdefs) {
                        if (funcdefs.hasOwnProperty(i)) {
                            if (functions.indexOf(i) != -1) {
                                throw(MessageStrings.protected);
                                return;
                            }
                            window.app.variables[i] = funcdefs[i];
                        }
                    }
                }

                //Give out this stuff. It probably won't be used anyway.
                ret.math = funcs;
                ret.funcdefs = funcdefs;
                ret.vars = vars;

                //This will be searched on window.app.refresh()
                ret.dependence = dependence;

                //This will be called from ui.js. Currently, all graphs share a context. I think this is sufficent, but it may not be.
                ret.plot = new Function("ctx", builder);

                //Trigger all changes
                if (window && window.app && window.app.refresh) {
                    window.app.refresh(changed);
                }
                return ret;

            }
        };

        return mathutil;
    })();

    return NAURE;
});