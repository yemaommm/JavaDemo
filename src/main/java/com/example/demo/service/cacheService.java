package com.example.demo.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

@Service
public class cacheService {

    //有则拿出，无则插入
    @Cacheable(value = "100.mycachetest", key = "'123'+#name")
    public String testcache100(String name){
        System.out.println("100111111111111111111111111");
        return "hello";
    }
    @Cacheable(value = "200.mycachetest", key = "'123'+#name")
    public String testcache200(String name){
        System.out.println("200111111111111111111111111");
        return "hello";
    }
    @Cacheable(value = "300.mycachetest", key = "'123'+#name")
    public String testcache300(String name){
        System.out.println("300111111111111111111111111");
        return "hello";
    }
    @Cacheable(value = "mycachetest", key = "'123'+#name")
    public String testcache0(String name){
        System.out.println("000111111111111111111111111");
        return "hello";
    }

    //更新
    @CachePut(value = "mycachetest")
    public String testcache2(){
        return "hello2";
    }

    //根据条件删除
    @CacheEvict(value = "mycachetest")
    public String testcache3(){
        return "hello3";
    }
}
