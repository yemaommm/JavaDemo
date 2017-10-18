package com.example.demo.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyServletRequestListener implements ServletRequestListener {
    private Logger logger = LoggerFactory.getLogger(MyServletRequestListener.class);

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        logger.info("ServletRequestListenerTest is destroyed .......");
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        logger.info("ServletRequestListenerTest is start .......");
    }
}
