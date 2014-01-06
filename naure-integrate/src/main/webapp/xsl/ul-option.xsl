<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" version="4.0" encoding="iso-8859-1"/>

    <xsl:template match="/">
        <xsl:apply-templates select="result/data/item"/>
    </xsl:template>

    <xsl:template match="result/data/item">
        <li>
            <xsl:attribute name="tag">
                <xsl:value-of select="key"/>
            </xsl:attribute>
            <xsl:value-of select="value"/>
        </li>
    </xsl:template>

</xsl:stylesheet>