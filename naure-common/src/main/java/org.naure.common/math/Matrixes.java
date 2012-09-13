package org.naure.common.math;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/6/12
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */
public class Matrixes {

    public float[][] matrix(Coordinate dimension1, Coordinate dimension2) {
        Point scope = new Point(
                dimension1.getX2() - dimension1.getX1(),
                dimension1.getY2() - dimension1.getY1()
        );
        Point scale = new Point(
                (dimension2.getX2() - dimension2.getX1()) / scope.getX(),
                (dimension2.getY2() - dimension2.getY1()) / scope.getY()
        );

        return new float[][]{
                {scale.getX(), 0, -dimension1.getX1() * scale.getX()},
                {0, scale.getY(), -dimension1.getY2() * scale.getY()},
                {0, 0, 1}
        };
    }

    public Point transform(float[][] matrix, Point coordinate) {
        if (null != (coordinate.getX())) {
            return new Point(coordinate.getX() * matrix[0][0] + matrix[0][2], null);
        }
        if (null != (coordinate.getY())) {
            return new Point(null, -(coordinate.getY() * matrix[1][1] - matrix[1][2]));
        }
        float[][] result = transform2D(matrix, new float[][]{{coordinate.getX(), coordinate.getY()}, {1, 1}});
        return new Point(result[0][0], -result[1][0]);
    }

    //2D 转换
    public float[][] transform2D(float[][] matrix1, float[][] matrix2) {
        //matrix2[2] = 1;
        return multiply(matrix1, matrix2);
    }

    //矩阵相乘
    public float[][] multiply(float[][] matrix1, float[][] matrix2) {
        //[ m x n] * [n x p]
        int m = matrix1.length;
        int n = matrix1[0] != null ? matrix1[0].length : 1;
        int p = matrix2[0] != null ? matrix2[0].length : 1;
        float[][] product = new float[m][];
        for (int i = 0; i < m; i++) {
            product[i] = new float[p];
            for (int j = 0; j < p; j++) {
                product[i][j] = 0;
                for (int k = 0; k < n; k++) {
                    product[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return product;
    }
}
