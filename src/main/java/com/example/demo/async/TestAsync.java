package com.example.demo.async;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

/**
 * @author admin
 */
@Service
@Component
@EnableAsync
public class TestAsync {


    @Bean
    public Executor myAsync() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(1);
        executor.setMaxPoolSize(1);
        executor.setQueueCapacity(1);
        executor.setThreadNamePrefix("ShopPortalAsync-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();

///        corePoolSize： 线程池维护线程的最少数量
///        maximumPoolSize：线程池维护线程的最大数量
///        keepAliveTime： 线程池维护线程所允许的空闲时间
///        unit： 线程池维护线程所允许的空闲时间的单位
///        workQueue： 线程池所使用的缓冲队列
///        handler： 线程池对拒绝任务的处理策略
///        ThreadPoolExecutor executor = new ThreadPoolExecutor(1, 1,
///                10, TimeUnit.MINUTES, new LinkedBlockingQueue<>(10));

        return executor;
    }

    @Async
    public Future<String> doRun1() throws InterruptedException {
        for (int i = 0;i < 10;i ++){
            Thread.sleep(200L);
            System.out.println("run1: " + i);
        }
        return new AsyncResult<>("1");
    }


    @Async
    public Future<String> doRun2() throws InterruptedException {
        for (int i = 0;i < 10;i ++){
            Thread.sleep(100L);
            System.out.println("run2: " + i);
        }
        return new AsyncResult<>("2");
    }

    @Async
    public Future<String> doRun3() throws InterruptedException {
        for (int i = 0;i < 10;i ++){
            Thread.sleep(100L);
            System.out.println("run3: " + i);
        }
        return new AsyncResult<>("3");
    }
}
