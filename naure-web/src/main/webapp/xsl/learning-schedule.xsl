<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:param name="exclude">
        -id-created-updated-
    </xsl:param>

    <xsl:template match="/">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <xsl:for-each select="information/data/*[1]/*[not(contains($exclude, concat(name(), '-')))]">
                        <xsl:call-template name="header"/>
                    </xsl:for-each>
                    <th>图表</th>
                    <xsl:for-each select="information/data/*[1]/*[contains($exclude, concat(name(), '-'))]">
                        <xsl:call-template name="headerHide"/>
                    </xsl:for-each>
                </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
                <xsl:for-each select="information/data/*">
                    <xsl:call-template name="row">
                        <!--&lt;!&ndash;<xsl:with-param name="head" select="'aaaa'" />&ndash;&gt;-->
                    </xsl:call-template>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

    <!--表头-->
    <xsl:template name="header">
        <th>
            <xsl:value-of select="name()"/>
        </th>
    </xsl:template>
    <xsl:template name="headerHide">
        <th class="cellHide">
            <xsl:value-of select="name()"/>
        </th>
    </xsl:template>

    <!--内容-->
    <xsl:template name="row">
        <tr>
            <xsl:if test="position() mod 2 = 0">
                <xsl:attribute name="class">
                    <xsl:text>tdeven</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <td>
                <xsl:value-of select="position()"/>
            </td>
            <!--一级子节点-->
            <xsl:for-each select="child::*[not(contains($exclude, concat(name(), '-')))]">
                <xsl:call-template name="cell"/>
            </xsl:for-each>

            <td>
                <canvas class="chart"></canvas>
            </td>

            <xsl:for-each select="child::*[contains($exclude, concat(name(), '-'))]">
                <xsl:call-template name="cellHide"/>
            </xsl:for-each>
        </tr>
    </xsl:template>

    <!--一级子节点-->
    <xsl:template name="cell">
        <td class="tdleft">
            <xsl:choose>
                <xsl:when test="child::*">
                    <table class="subtable">
                        <xsl:for-each select="child::*">
                            <!--二级子节点-->
                            <xsl:call-template name="row"></xsl:call-template>
                        </xsl:for-each>
                    </table>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="."/>
                </xsl:otherwise>
            </xsl:choose>
        </td>
    </xsl:template>

    <xsl:template name="cellHide">
        <td class="tdleft cellHide">
            <xsl:choose>
                <xsl:when test="child::*">
                    <table class="subtable">
                        <xsl:for-each select="child::*">
                            <!--二级子节点-->
                            <xsl:call-template name="row"></xsl:call-template>
                        </xsl:for-each>
                    </table>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="."/>
                </xsl:otherwise>
            </xsl:choose>
        </td>
    </xsl:template>

    <xsl:template name="printChild">
        <xsl:for-each select="child::*">
            <td>
                <xsl:value-of select="."/>
            </td>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>