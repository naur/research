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


define(['jquery', 'naur', 'naur.math'], function ($, NAUR) {

    NAUR.Math.Matrixes = (function () {
        var matrixes = {

            matrix:function (dimension1, dimension2) {
                var scope = {
                    X:dimension1.X2 - dimension1.X1,
                    Y:dimension1.Y2 - dimension1.Y1
                };
                var scale = {
                    X:(dimension2.X2 - dimension2.X1) / scope.X,
                    Y:(dimension2.Y2 - dimension2.Y1) / scope.Y
                };
                return [
                    [scale.X, 0, -dimension1.X1 * scale.X],
                    [0, scale.Y, -dimension1.Y2 * scale.Y],
                    [0, 0, 1]
                ];
            },

            matrixInvertible:function (dimension1, dimension2) {
                var scope = {
                    X:dimension1.X2 - dimension1.X1,
                    Y:dimension1.Y2 - dimension1.Y1
                };
                var scale = {
                    X:(dimension2.X2 - dimension2.X1) / scope.X,
                    Y:(dimension2.Y2 - dimension2.Y1) / scope.Y
                };
                return [
                    [1 / scale.X, 0, dimension1.X1],
                    [0, 1 / scale.Y, dimension1.Y2],
                    [0, 0, 1]
                ];
            },

            transform:function (matrix, coordinate) {
                if (!isNaN(coordinate.X)) {
                    return coordinate.X * matrix[0][0] + matrix[0][2];
                }
                if (!isNaN(coordinate.Y)) {
                    return -(coordinate.Y * matrix[1][1] + matrix[1][2]);
                }
                var result = matrixes.Transform2D(matrix, [coordinate.X, coordinate.Y]);
                return {X:result[0][0], Y:-result[1][0]};
            },

            //2D 转换
            Transform2D:function (matrix1, matrix2) {
                matrix2[2] = 1;
                return this.Multiply(matrix1, matrix2);
            },

            //矩阵加法
            Addition:function (matrix1, matrix2) {
                var product = [];
                var m = matrix1.length;
                var n = matrix2[0].length ? matrix1[0].length : 1;
                for (var i = 0; i < m; i++) {
                    for (var j = 0; j < n; j++) {
                        product[i][j] = matrix1[i][j] + matrix2[i][j];
                    }
                }
                return product;
            },

            //矩阵相乘
            Multiply:function (matrix1, matrix2) {
                //[ m x n] * [n x p]
                var product = [];
                var m = matrix1.length;
                var n = matrix1[0].length ? matrix1[0].length : 1;
                var p = matrix2[0].length ? matrix2[0].length : 1;
                for (i = 0; i < m; i++) {
                    product[i] = [];
                    for (j = 0; j < p; j++) {
                        product[i][j] = 0;
                        for (k = 0; k < n; k++) {
                            product[i][j] += matrix1[i][k] * (matrix2[k][j] ? matrix2[k][j] : matrix2[k]);
                        }
                    }
                }
                return product;
            },

            //逆矩阵： Invertible matrix
            Invertible:function (matrix) {
                var determinant = Determinant(matrix);
                var adjugate = AdjugateMatrix(matrix);
                for (var i = 0; i < determinant.length; i++) {
                    for (var j = 0; i < determinant[i].length; j++) {
                        adjugate[i][j] *= (1 / determinant);
                    }
                }
                return adjugate;
            },

            //伴随矩阵： Adjugate matrix
            Adjugate:function (matrix) {
                //todo 只支持 [3 X 3] 矩阵
                var adjugate = [];
                return matrix;
            },

            //行列式： Determinant
            Determinant:function (matrix) {
                return matrix[0][0] * matrix[1][1] * matrix[2][2] +
                    matrix[0][1] * matrix[1][2] * matrix[2][0] +
                    matrix[0][2] * matrix[1][0] * matrix[2][1] -
                    matrix[0][2] * matrix[1][1] * matrix[2][0] -
                    matrix[0][0] * matrix[1][2] * matrix[2][1] -
                    matrix[0][1] * matrix[2][0] * matrix[2][2];
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

        return matrixes;
    })();

    return NAUR;

});