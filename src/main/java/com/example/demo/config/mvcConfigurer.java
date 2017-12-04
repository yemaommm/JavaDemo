package com.example.demo.config;

import com.example.demo.DemoApplication;
import com.example.demo.Interceptor.MyInterceptor;
import com.example.demo.dao.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.Resource;
import java.util.List;

@Configuration
//@ComponentScan(basePackageClasses = DemoApplication.class, useDefaultFilters = true)
public class mvcConfigurer extends WebMvcConfigurerAdapter {

    @Resource(name = "admin")
    Permission p;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        super.addInterceptors(registry);
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");

    }

    @Bean("admin")
    @ConfigurationProperties(prefix = "test.admin")
    public Permission createPermission(){
        return new Permission();
    }

    /**
     * 用来添加自定义参数的方法
     * @param argumentResolvers
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new TestMethodArgumentResolver());
        super.addArgumentResolvers(argumentResolvers);
    }
}
