<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" version="4.0" encoding="iso-8859-1"/>

    <xsl:template match="/">
        <xsl:text>[</xsl:text>
        <xsl:apply-templates select="result/item[1]"/>
        <xsl:apply-templates select="result/item/item"/>
        <xsl:text>]</xsl:text>
    </xsl:template>

    <xsl:template match="result/item[1]">
        <xsl:text>{"fileName": "</xsl:text>
        <xsl:value-of select="." disable-output-escaping="yes"/>
        <xsl:text>"}</xsl:text>
    </xsl:template>

    <xsl:template match="result/item/item">
        <xsl:apply-templates select="item/item"/>
    </xsl:template>

    <xsl:template match="item/item">
        <xsl:text>,</xsl:text>
        <xsl:text>{"cell": "【</xsl:text>
        <xsl:value-of select="column"/>
        <xsl:value-of select="row"/>
        <xsl:text>】","error": "</xsl:text>
        <xsl:value-of select="error"/>
        <xsl:text>"}</xsl:text>
    </xsl:template>

    <xsl:template match="//item/row">
        <xsl:value-of select="." disable-output-escaping="yes"/>
    </xsl:template>
    <xsl:template match="//item/column">
        <xsl:value-of select="." disable-output-escaping="yes"/>
    </xsl:template>
    <xsl:template match="//item/error">
        <xsl:value-of select="." disable-output-escaping="yes"/>
    </xsl:template>

</xsl:stylesheet>