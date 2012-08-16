/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 10:56 AM
 * Description:
 *
 */

var MinMilli = 1000 * 60
var HrMilli = MinMilli * 60
var DyMilli = HrMilli * 24

//Basic math functions -> window (global)
var e = Math.E;
var pi = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var tg = Math.tan;
var exp = Math.exp;
var log = Math.log;
var ln = Math.log;
var abs = Math.abs;
var acos = Math.acos;
var asin = Math.asin;
var atan = Math.atan;
var atan2 = Math.atan2;
var ceil = Math.ceil;
var floor = Math.floor;
var max = Math.max;
var min = Math.min;
var random = Math.random;
var round = Math.round;
var sqrt = Math.sqrt;
var pow = Math.pow;
var lg = function (x) {
    return ln(x) / ln(2);
};

//Hyperbolic functions
function cosh(x) {
    return 0.5 * (exp(x) + exp(-x));
}
function sinh(x) {
    return 0.5 * (exp(x) - exp(-x));
}
function tanh(x) {
    return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
}
function sech(x) {
    return 1 / cosh(x);
}
function cosech(x) {
    return 1 / sech(x);
}
function coth(x) {
    return 1 / tanh(x);
}

//Inverse hyperbolic functions
function acosh(x) {
    return log(x + sqrt(x * x - 1));
}
function asinh(x) {
    return log(x + sqrt(x * x + 1));
}
function atanh(x) {
    return 0.5 * log((1 + x) / (1 - x));
}


function ln_n(n, x) {
    return pow(ln(x), n);
}

function sin_n(n, x) {
    return pow(sin(x), n);
}
function cos_n(n, x) {
    return pow(cos(x), n);
}
function tan_n(n, x) {
    return pow(tan(x), n);
}
function cot_n(n, x) {
    return pow(cot(x), n);
}
function sec_n(n, x) {
    return pow(sec(x), n);
}
function csc_n(n, x) {
    return pow(csc(x), n);
}
function log_n(n, x) {
    return pow(log(x), n);
}

function cosh_n(n, x) {
    return pow(cosh(x), n);
}
function sinh_n(n, x) {
    return pow(cosh(x), n);
}
function tanh_n(n, x) {
    return pow(cosh(x), n);
}
function coth_n(n, x) {
    return pow(coth(x), n);
}
function sech_n(n, x) {
    return pow(sech(x), n);
}
function csch_n(n, x) {
    return pow(csch(x), n);
}

function logb(b, v) {
    return ln(v) / ln(b);
}

function u(x) {
    //unit step function
    return (x >= 0) ? (x ? 1 : 0.5) : (0);
}
function u_d(x) {
    //discrete unit step function
    return (x >= 0) ? 1 : 0;
}
function delta(x) {
    if (x == 0) {
        return Infinity;
    }
    return 0;
}

function signum(x) {
    return 2 * u(x) - 1;
}

function piecewise(cond, val, other) {
    if (cond) {
        return val;
    }
    return other;
}
function sinc(x) {
    if (x === 0) {
        return 1;
    }
    return sin(pi * x) / (pi * x);
}
function sec(x) {
    return 1 / (cos(x));
}
function csc(x) {
    return 1 / (sin(x));
}
function cot(x) {
    return 1 / (tan(x));
}
var ctg = cot;
var ctn = cot;
var cosec = csc;

//Not so basic math

//Bell numbers
var blln = [1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147, 115975, 678570, 4213597, 27644437, 190899322, 1382958545, 10480142147, 82864869804, 682076806159, 5832742205057, 51724158235372, 474869816156751, 4506715738447323];

//Riemann zeta function
function zeta(x) {
    if (x === 0) {
        return -0.5;
    } else if (x == 1) {
        return Infinity;
    } else if (x == 2) {
        return pi * pi / 6;
    } else if (x == 4) {
        return pi * pi * pi * pi / 90;
    } else if (x < 1) {
        return Infinity;
    }
    var sum = 4.4 * pow(x, -5.1);
    for (var npw = 1; npw < 10; npw++) {
        sum += pow(npw, -x);
    }
    return sum;
}

function gammln(xx) {
    var j;
    var x, tmp, y, ser;
    var cof = [57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199, 0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4, 0.158088703224912494e-3, -0.210264441724104883e-3, 0.217439618115212643e-3, -0.164318106536763890e-3, 0.844182239838527433e-4, -0.261908384015814087e-4, 0.368991826595316234e-5];
    if (xx <= 0) {
        throw("bad arg in gammln");
    }
    y = x = xx;
    tmp = x + 5.24218750000000000;
    tmp = (x + 0.5) * log(tmp) - tmp;
    ser = 0.999999999999997092;
    for (j = 0; j < 14; j++) {
        ser += cof[j] / ++y;
    }
    return tmp + log(2.5066282746310005 * ser / x);
}
function Gamma(x) {
    if (x == 0) {
        return Infinity;
    }
    if (x < 0) {
        return -pi / (x * sin(pi * x) * Gamma(-x));
    }
    return exp(gammln(x));
}

function old_gamma_function(x) {
    if (x > 1.0) {
        return (exp(x * (ln(x) - 1) + 0.5 * (-ln(x) + log2pi) + 1 / (12 * x) - 1 / (360 * (x * x * x)) + 1 / (1260 * pow(x, 5)) - 1 / (1680 * pow(x, 7))));
    }
    if (x > -0.5) {
        return (1.0 + 0.150917639897307 * x + 0.24425221666910216 * pow(x, 2)) / (x + 0.7281333047988399 * pow(x, 2) - 0.3245138289924575 * pow(x, 3));
    }
    if (x < 0) {
        if (x == ~~x) {
            return;
        } else {
            return Math.PI / (Math.sin(Math.PI * x) * Gamma((1 - x)));
        }
    } else {
        return pow(x - 1, x - 1) * Math.sqrt(2 * Math.PI * (x - 1)) * exp(1 - x + 1 / (12 * (x - 1) + 2 / (5 * (x - 1) + 53 / (42 * (x - 1)))));
    }
}

function psi(x) {
    return random();
}

function fact(ff) {
    if (ff === 0 || ff == 1) {
        return 1;
    } else if (ff > 0 && ff == ~~ff && ff < 15) {
        var s = 1;
        for (var nns = 1; nns <= ff; nns++) {
            s *= nns;
        }
        return~~s;
    } else if (ff != (~~ff) || ff < 0) {
        return Gamma(ff + 1);
    }
}
function doublefact(x) {
    return pow(2, (x / 2 - 1 / 4 * cos(pi * x) + 1 / 4)) * pow(pi, (1 / 4 * cos(pi * x) - 1 / 4)) * Gamma(x / 2 + 1);
}
function bellb(x) {
    if (x == ~~x && x < blln.length) {
        return blln[x];
    } else {
        var sum = 0;
        for (var inj = 0; inj < 5; inj++) {
            sum += pow(inj, x) / fact(inj);
        }
        return sum / e;
    }
}


// 'lvl'th derivative of g[ia](x) when x = 'x'

var difflevel = 0; //Used to prevent massive stacks in the recursive djkb()

function djkb(ia, lvl, x) {
    difflevel++;
    var res;
    if (difflevel > 8) {
        difflevel -= 1;
        return 0;
    }
    var h = 0.0001;
    if (lvl > 0) {
        res = (djkb(ia, lvl - 1, x + h) - djkb(ia, lvl - 1, x - h)) / (2 * h);
        difflevel -= 1;
        return res;
    }
    res = g[ia](x);
    difflevel -= 1;
    return res;
}


//todo 'math.js' 与 ajaxsl.js 有冲突
define(['jquery', 'naure'], function ($, NAURE) {

    NAURE.Math = (function () {
        var math = {
            arbRound:function (value, roundTo) {
                return Math.round(value / roundTo) * roundTo;
            },

            arbFloor:function (value, roundTo) {
                return Math.floor(value / roundTo) * roundTo;
            }
        };

        return math;
    })();

    return NAURE;

});