<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
<xsl:output method="html" version="4.0" encoding="iso-8859-1" />

  <xsl:template match="/">
        <xsl:apply-templates select="result/item[message!='null']" />
  </xsl:template>

  <xsl:template match="item">
    <span>
        <xsl:value-of select="position()" />
        <xsl:text>: </xsl:text>
        <xsl:value-of select="message" />
    </span>
  </xsl:template>

  <xsl:template match="message">
    <xsl:value-of select="." disable-output-escaping="yes"/>
  </xsl:template>
    
</xsl:stylesheet>