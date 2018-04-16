package com.example.demo.scheduled;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TestScheduled {

    /**
@Scheduled注解有一些参数，用于配置计划任务执行频率，执行时段等。

    cron ：cron表达式，e.g. {@code "0 * * * * ？"}从前到后依次表示秒 分 时 日 月 年
    zone：设置时区，指明计划任务运行在哪个时区下，默认为空，采用操作系统默认时区
    fixedDelay：同一个计划任务两次执行间隔固定时间，单位毫秒，上次执行结束到下次开始执行的时间，以long类型复制
    fixedDelayString：同一个计划任务两次执行间隔固定时间，单位毫秒，上次执行结束到下次开始执行的时间，以String类型赋值
    fixedRate：以一个固定频率执行，单位毫秒，表示每隔多久执行一次，以long类型赋值
    fixedRateString：以一个固定频率执行，单位毫秒，表示每隔多久执行一次，以String类型赋值
    initialDelay：延迟启动计划任务，单位毫秒，表示执行第一次计划任务前先延迟一段时间，以long类型赋值
    initialDelayString：延迟启动计划任务，单位毫秒，表示执行第一次计划任务前先延迟一段时间，以String赋值
     */
    @Scheduled(fixedDelay = 10000)
    public void tt(){
        System.out.println(System.currentTimeMillis());
    }
}
