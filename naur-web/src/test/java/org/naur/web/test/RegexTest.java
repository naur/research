/*
 * @(#) RegexTest.java 2014-06-15
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.web.test;

import org.junit.Test;
import org.naur.repositories.models.finance.StockQuote;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-06-15
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class RegexTest {
    @Test
    public void test() {
        String str = "111.3.22.11";
        System.out.println(str.replaceAll("(^|\\.)(\\d)(\\.|$)", "$100$2$3"));
        System.out.println(str.replaceAll("(^|\\.)(\\d{2})(\\.|$)", "$10$2$3"));
        System.out.println(str.replaceAll("(^|\\.)(\\d{2})(\\.|$)", "$10$2$3"));
        System.out.println(str.replaceAll("(^|\\.)(\\d{1})(\\.|$)", "$100$2$3"));

        System.out.println(collectionName(StockQuote.class.getName()));
    }

    private String collectionName(String classFullName) {
        return classFullName.substring(
                classFullName.indexOf("models.") + 7
        ).replaceAll("([a-z])([A-Z])", "$1.$2").toLowerCase();
    }
}
