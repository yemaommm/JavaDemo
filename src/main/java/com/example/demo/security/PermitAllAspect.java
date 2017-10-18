package com.example.demo.security;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Configuration
@Aspect
public class PermitAllAspect {

    //    @Pointcut("execution(* com.example.demo.DemoApplication.*(..))")
    @Pointcut("execution(* org.springframework.security.access.annotation.Jsr250MethodSecurityMetadataSource.*(..))")
    public void PoinCut(){}

    @After("PoinCut()")
    public void After(JoinPoint jp){
        MethodSignature signature = (MethodSignature) jp.getSignature();
        Method method = signature.getMethod();
        System.out.println("---------------------------------");
        System.out.println(method.getName());
    }
}
