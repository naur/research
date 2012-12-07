<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" version="4.0" encoding="iso-8859-1"/>

    <xsl:template match="/">
        <option value='-1'>请选择</option>
        <xsl:apply-templates select="result/data/item"/>
    </xsl:template>

    <xsl:template match="result/data/item">
        <option>
            <xsl:attribute name="value">
                <xsl:value-of select="key"/>
            </xsl:attribute>
            <xsl:value-of select="name"/>
            <xsl:value-of select="groupName"/>
        </option>
    </xsl:template>

</xsl:stylesheet>