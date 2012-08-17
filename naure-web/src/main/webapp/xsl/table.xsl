<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!--<xsl:param name="exclude">-->
        <!--&lt;!&ndash;name()!='created' and name()!='updated' and name()!='id' and name()!='sessionId'&ndash;&gt;-->
        <!---id-created-updated-sessionId -->
    <!--</xsl:param>-->

    <xsl:template match="/">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <xsl:apply-templates
                            select="information/data/*[1]/*[name()!='created' and name()!='updated' and name()!='id' and name()!='sessionId']"/>
                    <xsl:apply-templates
                            select="information/data/*[1]/*[name()='created' or name()='updated' or name()='id' or name()!='sessionId']"/>
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
    <xsl:template match="information/data/*[1]/*[name()!='created' and name()!='updated' and name()!='id' and name()!='sessionId']">
        <th>
            <xsl:value-of select="name()"/>
        </th>
    </xsl:template>
    <xsl:template match="information/data/*[1]/*[name()='created' or name()='updated' or name()='id' or name()!='sessionId']">
        <th>
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
            <xsl:for-each select="child::*[name()!='created' and name()!='updated' and name()!='id']">
                <xsl:call-template name="cell"/>
            </xsl:for-each>
            <xsl:for-each select="child::*[name()='created' or name()='updated' or name()='id']">
                <xsl:call-template name="cell"/>
            </xsl:for-each>
        </tr>
    </xsl:template>

    <!--一级子节点-->
    <xsl:template name="cell">
        <td>
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