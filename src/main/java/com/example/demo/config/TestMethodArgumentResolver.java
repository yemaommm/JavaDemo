package com.example.demo.config;

import com.example.demo.annotation.TestParam;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * 自定义参数解析器
 */
public class TestMethodArgumentResolver implements HandlerMethodArgumentResolver {

    /**
     * 判断是否拥有符合条件的参数
     * @param parameter
     * @return
     */
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(TestParam.class);
    }

    /**
     * 符合条件的参数才会进入此方法，在此方法中获取到具体参数的值然后返回给RequeestMappering方法体
     * @param parameter
     * @param mavContainer
     * @param webRequest
     * @param binderFactory
     * @return
     * @throws Exception
     */
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        if (parameter.getParameterType().isAssignableFrom(String.class)){
            return "string";
        }else if(parameter.getParameterType().isAssignableFrom(Integer.class)){
            return 111111;
        }
        return null;
    }
}
