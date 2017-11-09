package com.example.demo;

import com.example.demo.async.TestAsync;
import com.example.demo.dao.admin_auth;
import com.example.demo.mapper.AdminMapper;
import com.example.demo.service.cacheService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@SpringBootApplication
@ServletComponentScan(basePackages = "com.example.demo")
@ImportResource(locations = {"classpath:application-bean.xml"})  // 导入本地xml
@RestController
@RequestMapping("/test")
@Api(value = "test", tags = "1.1", basePath = "test", description = "111")
public class DemoApplication extends SpringBootServletInitializer {

	@Autowired
	private AdminMapper am;
	@Autowired
	private testService ts;
	@Autowired
	private cacheService cs;
	@Autowired
	private TestAsync testAsync;

	@PreAuthorize("hasAuthority('IUSER')")//这里可以指定特定角色
	@RequestMapping(value = "/find", method = {RequestMethod.GET, RequestMethod.POST})
	public admin_auth find(){
//		Map<String, String> a = new HashMap<String, String>(16);
//		a.forEach((k, v)->{
//
//		});
//		new Thread(()->{});
//		Runnable race2 = () -> System.out.println("Hello world !");
		admin_auth aa = am.ffind();
		ts.insert();

		return aa;
	}

	@PermitAll
//	@PreAuthorize("hasAuthority('*')")
	@RequestMapping(value = "/testcache", method = {RequestMethod.GET})
	public String testcache(){

		return cs.testcache300("hhhhhhhhh");
	}

	@RequestMapping(value = "/testaop", method = {RequestMethod.GET})
	public boolean testaop() throws InterruptedException, ExecutionException {

		Future<String> run1 = testAsync.doRun1();
		Future<String> run2 = testAsync.doRun2();
        Future<String> run3 = testAsync.doRun3();

		// 获取值的时候会进行等待
        System.out.println(run1.get());
        System.out.println(run3.get());
		System.out.println(run2.get());

		boolean b = run1.isDone() && run2.isDone();

		return b;
	}


	@RequestMapping(value = "/testcache2", method = {RequestMethod.GET})
	public String testcache2(){

		return cs.testcache2();
	}

	@PreAuthorize("hasAuthority('USER')")//这里可以指定特定角色
    @RequestMapping(value = "/findall", method = {RequestMethod.GET, RequestMethod.POST})
    public String findall() throws JsonProcessingException {
        PageHelper.startPage(2, 5);
        List<Map<String, Object>> aas = am.findall();
        PageInfo pageInfo = new PageInfo(aas);
        Page page = (Page) aas;
//        return aas;
        ObjectMapper mapper = new ObjectMapper();
        return "PageInfo: " + mapper.writeValueAsString(pageInfo) + ", Page: " + mapper.writeValueAsString(page);
    }

	@ApiOperation(value="获取用户列表", notes="")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "admin_auth", value = "用户2ID", required = true, dataType = "admin_auth")
	})

    @RequestMapping(value = "/testObject", method = {RequestMethod.GET, RequestMethod.POST})
	public admin_auth testObject(@Valid @RequestBody admin_auth cc){
		return cc;
	}

	@RequestMapping(value = "/putObject", method = {RequestMethod.GET, RequestMethod.GET})
	public admin_auth putObject(){
		admin_auth aa = new admin_auth();
		aa.setUsername("123123");
		aa.setId(0L);
		return aa;
	}


	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(DemoApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
