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

define(['jquery', 'naure', 'math'], function ($, NAURE) {

    NAURE.Math = (function () {
        var math = {
            arbRound:function (value, roundTo) {
                return Math.round(value / roundTo) * roundTo;
            },

            arbFloor:function (value, roundTo) {
                return Math.floor(value / roundTo) * roundTo;
            },

            Matrix:function () {
                this.matrix = [];
                for (i = 0; i < arguments.length; i++) {
                    this.matrix[i] = arguments[i];
                }
            }

            //3x3 仿射变换矩阵
//            1     0    0
//            0    1     0
//            1    0    1
//            Matrix:function () {
//                this.M11 = 1;
//                this.M12 = 0;
//                this.M21 = 0;
//                this.M22 = 1;
//                this.OffsetX = 0;
//                this.OffsetY = 0;
//            },
        };

        //2D 转换
        math.Matrix.prototype.Transform2D = function (matrix1, matrix2) {
            matrix1[2] = 1;
            var m = this.length;
            var n = this.length;

            var result = [0, 0, 0];
            for (var i = 0; i < m; i++) {
                for (var j = 0; j < n; j++) {
                    result[i] += matrix1[i][j] * matrix2[j]
                }
            }
            return {X:result[0], Y:result[1]};
        };

        //矩阵加法
        math.Matrix.prototype.Addition = function (matrix1, matrix2) {
            var product = [];
            var m = matrix1.length;
            var n = matrix1[0].length;
            for (var i = 0; i < m; i++) {
                for (var j = 0; j < n; j++) {
                    product[i][j] = matrix1[i][j] + matrix2[i][j];
                }
            }
            return product;
        };

        //矩阵相乘
        math.Matrix.prototype.Multiply = function (matrix1, matrix2) {
            var product = [];
            var m = matrix1.length;
            var n = matrix2[0].length;
            for (var i = 0; i < m; i++) {
                for (var j = 0; j < n; j++) {
                    if (!product[i][j])
                        product[i][j] = 0;
                    product[i][j] += matrix1[i][j] * matrix2[i][j];
                }
            }
            return product;
        };

        //逆矩阵： Invertible matrix
        math.Matrix.prototype.Invertible = function (matrix) {
            var determinant = Determinant(matrix);
            var adjugate = AdjugateMatrix(matrix);
            for (var i = 0; i < determinant.length; i++) {
                for (var j = 0; i < determinant[i].length; j++) {
                    adjugate[i][j] *= (1 / determinant);
                }
            }
            return adjugate;
        };

        //伴随矩阵： Adjugate matrix
        math.Matrix.prototype.Adjugate = function (matrix) {
            //todo 只支持 [3 X 3] 矩阵
            var adjugate = [];
            return matrix;
        };

        //行列式： Determinant
        math.Matrix.prototype.Determinant = function (matrix) {
            return matrix[0][0] * matrix[1][1] * matrix[2][2] +
                matrix[0][1] * matrix[1][2] * matrix[2][0] +
                matrix[0][2] * matrix[1][0] * matrix[2][1] -
                matrix[0][2] * matrix[1][1] * matrix[2][0] -
                matrix[0][0] * matrix[1][2] * matrix[2][1] -
                matrix[0][1] * matrix[2][0] * matrix[2][2];
        };

        math.Matrix.prototype.row = function () {
            return this.matrix.length;
        }

        math.Matrix.prototype.column = function () {
            return this.matrix[0].length;
        }
        math.Matrix.prototype.Transform2DTest = function (matrix1, matrix2) {
            return null;
        };

        return math;
    })();

    return NAURE;

})
;