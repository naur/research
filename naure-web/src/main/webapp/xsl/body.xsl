<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <xsl:apply-templates select="/body"/>
    </xsl:template>

    <xsl:template match="/body">
        <xsl:copy-of select=""  />
    </xsl:template>

</xsl:stylesheet>