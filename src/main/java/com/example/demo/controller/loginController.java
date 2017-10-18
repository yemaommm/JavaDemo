package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.security.PermitAll;

@Controller
public class loginController {
    private Logger logger = LoggerFactory.getLogger(loginController.class);

    @PermitAll
    @RequestMapping("/login")
    public String login(){
        logger.info("123123123123123");
        return "login";
    }
}
