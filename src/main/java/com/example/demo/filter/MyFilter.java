package com.example.demo.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "myFilter", urlPatterns = "/*")
public class MyFilter implements Filter {
    private Logger logger = LoggerFactory.getLogger(MyFilter.class);
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("过滤器初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        logger.info("执行过滤操作");
        chain.doFilter(request, response);
        logger.info("执行过滤操作结束");
    }

    @Override
    public void destroy() {
        logger.info("过滤器销毁");
    }
}
