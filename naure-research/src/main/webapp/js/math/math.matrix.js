/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            Dynamic Programming - Matrix，
 * Date：
 *          11:20 3/14/2012
 */

//初始化 NIL;
var NIL = null;

/*
 * Matrix
 */
function Matrix(row, column) {
    this.row = row;
    this.column = column;
}

function MatrixChain() {

    this.p = new Array();
    this.p.push(new Matrix());
    //format: row X column
    for (i = 0; i < arguments.length; i++) {
        this.p.push(new Matrix(
            arguments[i].replace(/(\d+)[Xx*\s]+(\d+)/g, function ($0, $1, $2) {
                return $1
            }),
            arguments[i].replace(/(\d+)[Xx*\s]+(\d+)/g, function ($0, $1, $2) {
                return $2
            })
        ))
    }

    this.m = null;
    this.s = null;

    this.order = function (p) {
        //Let m[i, j] be the minimum number of scalar multiplications needs to compute the matrix A[i....j].
        this.m = new Array();
        this.s = new Array();

        var n = p.length - 1;
        for (i = 1; i <= n; i++) {      //忽略数组的 0 索引。
            this.s[i] = new Array();
            this.m[i] = new Array();
            this.m[i][i] = 0;   // If i = j, the problem is trivial; the chain consists of just on matrix A[i...i] = A[i].
        }
        for (l = 2; l <= n; l++) {  // l is the chain length.
            for (i = 1; i <= n - l + 1; i++) {
                var j = i + l - 1;
                this.m[i][j] = Number.POSITIVE_INFINITY;
                for (k = i; k < j; k++) {
                    var q = this.m[i][k] + this.m[k + 1][j] + p[i].row * p[k].column * p[j].column;
                    if (q < this.m[i][j]) {
                        this.m[i][j] = q;
                        this.s[i][j] = k;
                    }
                }
            }
        }
    };

    // Memoization
    this.memoized = function (p) {
        this.m = new Array();

        var n = p.length - 1;
        for (i = 1; i <= n; i++) {
            this.m[i] = new Array();
            for (j = 1; j <= n; j++) {
                this.m[i][j] = Number.POSITIVE_INFINITY;
            }
        }

        return this.lookup(p, 1, n);
    };
    this.lookup = function (p, i, j) {
        if (this.m[i][j] < Number.POSITIVE_INFINITY)
            return this.m[i][j];

        if (i == j)
            this.m[i][j] = 0;
        else {
            for (k = i; k < j; k++) {
                var q = this.lookup(p, i, k) + this.lookup(p, k + 1, j) + p[i].row * p[k].column * p[j].column;
                if (q < this.m[i][j])
                    this.m[i][j] = q;
            }
        }
    };

    this.inorderWalk = function (p) {
        for (i = 0; i < p.length; i++) {
            arguments[1](p[i]);
        }
    };
}


