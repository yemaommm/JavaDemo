package com.example.demo.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * 监听Session的创建与销毁
 *
 */
@WebListener
public class MyHttpSessionListener implements HttpSessionListener {

    private Logger logger = LoggerFactory.getLogger(MyServletContextListener.class);

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        logger.info("Session 被创建");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        logger.info("ServletContex初始化");
    }

}
