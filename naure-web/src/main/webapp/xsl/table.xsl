<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <table>
            <thead>
                <tr bgcolor="#9acd32">
                    <th></th>
                    <xsl:apply-templates select="org.naure.common.entities.Information/data/*[1]/*"/>
                </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
                <xsl:apply-templates select="org.naure.common.entities.Information/data/*"/>
            </tbody>
        </table>
    </xsl:template>

    <xsl:template match="org.naure.common.entities.Information/data/*[1]/*">
        <th>
            <xsl:value-of select="name()"/>
        </th>
    </xsl:template>

    <xsl:template match="org.naure.common.entities.Information/data/*">
        <tr>
            <td>
                <xsl:value-of select="position()" />
            </td>
            <xsl:for-each select="./*">
                <td>
                    <xsl:value-of select="."/>
                </td>
            </xsl:for-each>
        </tr>
    </xsl:template>

</xsl:stylesheet>