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


    gradle.taskGraph.whenReady { taskGraph ->
        if (taskGraph.hasTask(release)) {
            ext.profile = 'production'
        } else {
            ext.profile = ''
        }
    }


if (null != ext.profile && !(ext.profile.equals(""))) {
                config = config.merge(new ConfigSlurper(project['profile']).parse(configFile));
            }


    testCompile project(path: ':core:naure-common', type: 'tests')
    D:/Research/projects/res/naure-research/build/reports/tests/index.html

    dependencies {
        testCompile project(':modules:bam-ae').sourceSets.test.classes
        groovy localGroovy()
    }


configurations {
    testArtifacts
}
task testJar (type: Jar) {
    baseName = "${project.name}-test"
    from sourceSets.test.output
}
artifacts {
    testArtifacts testJar
}
testCompile project (path: ":some-project", configuration: 'testArtifacts')