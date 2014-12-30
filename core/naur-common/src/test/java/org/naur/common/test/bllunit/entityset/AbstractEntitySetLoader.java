/*
 * @(#) AbstractEntityLoader.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naur.common.test.bllunit.entityset;

import org.springframework.core.io.ClassRelativeResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-10-11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public abstract class AbstractEntitySetLoader implements EntitySetLoader {

    protected ResourceLoader getResourceLoader(Class<?> testClass) {
        return new ClassRelativeResourceLoader(testClass);
    }

    protected String[] getResourceLocations(Class<?> testClass, String location) {
        return new String[]{location};
    }

    protected abstract EntitySet createEntitySet(Resource resource) throws Exception;

    @Override
    public EntitySet loadEntitySet(Class<?> testClass, String location) throws Exception {
        ResourceLoader resourceLoader = getResourceLoader(testClass);
        String[] resourceLocations = getResourceLocations(testClass, location);
        for (String resourceLocation : resourceLocations) {
            Resource resource = resourceLoader.getResource(resourceLocation);
            if (resource.exists()) {
                return createEntitySet(resource);
            }
        }
        return null;
    }
}
