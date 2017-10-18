package com.example.demo.config;

import org.springframework.cache.Cache;
import org.springframework.data.redis.cache.RedisCache;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.core.RedisOperations;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MyRedisCacheManager extends RedisCacheManager {
    public MyRedisCacheManager(RedisOperations redisOperations) {
        super(redisOperations);
    }

    @Override
    public Cache getCache(String name) {
        long t = 0;
        try {
            String time = name.split("\\.")[0];
            t = Long.valueOf(time);;
        }catch (Exception e){}

        Map<String, Long> ex = new ConcurrentHashMap<>(1);
        ex.put(name, t);
        this.setExpires(ex);
        RedisCache cache = (RedisCache) super.getCache(name);
//        String key = cache.getName();
//        cache.pu

        return cache;
    }


}
