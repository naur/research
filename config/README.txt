//    def installer = install.repositories.mavenInstaller
//    def deployer = uploadArchives.repositories.mavenDeployer
//
//    [installer, deployer]*.pom*.whenConfigured { pom ->
//        pom.dependencies.find { dep -> dep.groupId == 'group3' && dep.artifactId == 'runtime' }.optional = true
//    }

//    def loadGroovyConfig() {
////    def configFile = file('../../config/config.groovy')
//        def configFile = new File("${rootProject.projectDir}/config/config.groovy")
//        new ConfigSlurper(profile).parse(configFile.toURL()).toProperties()
//    }

    processResources {
        from(sourceSets.main.resources.srcDirs) {
            filter(org.apache.tools.ant.filters.ReplaceTokens,
                    tokens: config.toProperties()
            )
        }
    }


    testCompile project(path: ':core:naure-common', type: 'tests')
    D:/Research/projects/res/naure-research/build/reports/tests/index.html