package com.example.demo;

import com.example.demo.dao.Permission;
import com.example.demo.service.cacheService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DemoApplicationTests {

	@LocalServerPort
	private int port;

	private final String HOST = "http://127.0.0.1";
	@Autowired
	cacheService cs;
	@Autowired
	TestRestTemplate restTemplate;
	@Resource(name = "admin3")
    Permission permission;

	public <T> T doObject(String url, Class<T> clazz){
		return restTemplate.getForObject(HOST + ":" + port + url, clazz);
	}

	@Test
	public void contextLoads() throws IOException {

        ObjectMapper om = new ObjectMapper();
        System.out.println(om.readValue("true", boolean.class) == true);
        String s = om.writeValueAsString(permission);
        System.out.println(s);
        System.out.println(permission);
//		System.out.println(cs.testcache0("0"));
//		System.out.println(cs.testcache100("100"));
//		System.out.println(cs.testcache100("0100"));
//		System.out.println(cs.testcache200("200"));
//		System.out.println(cs.testcache300("300"));
	}

	@Test
	public void testAsync(){
		boolean ret = this.doObject("/test/testaop", boolean.class);
		assert ret == true;
	}

}
