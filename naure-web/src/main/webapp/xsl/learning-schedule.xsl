<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <xsl:apply-templates select="information/data/*[1]/*"/>
                </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
                <xsl:apply-templates select="information/data/*"/>
            </tbody>
        </table>
    </xsl:template>

    <!--表头-->
    <xsl:template match="information/data/*[1]/*">
        <th>
            <xsl:value-of select="name()"/>
        </th>
    </xsl:template>

    <!--内容-->
    <xsl:template match="information/data/*">
        <tr>
            <xsl:if test="position() mod 2 = 0">
                <xsl:attribute name="class">
                    <xsl:text>tdeven</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <td class="tdleft">
                <xsl:value-of select="position()"/>
            </td>

            <!--一级子节点-->
            <xsl:for-each select="child::*">
                <td class="tdleft">
                    <xsl:choose>
                        <xsl:when test="child::*">
                            <table class="subtable">
                                <!--二级子节点-->
                                <xsl:for-each select="child::*">
                                    <tr>
                                        <xsl:if test="position() mod 2 = 0">
                                            <xsl:attribute name="class">
                                                <xsl:text>tdeven</xsl:text>
                                            </xsl:attribute>
                                        </xsl:if>
                                        <xsl:call-template name="printChild"/>
                                    </tr>
                                </xsl:for-each>
                            </table>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="tag">
                                <xsl:value-of select="."/>
                            </xsl:attribute>
                            <xsl:value-of select="."/>
                        </xsl:otherwise>
                    </xsl:choose>
                </td>
            </xsl:for-each>

        </tr>
    </xsl:template>

    <xsl:template name="printChild">
        <xsl:for-each select="child::*">
            <td>
                <xsl:value-of select="."/>
            </td>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>