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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

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

	public <T> void lambdaPrintFun(T t){
	    System.out.println(t);
    }

    public int lambdaSortFun(int x, int y){
        return (x < y) ? 1 : ((x == y) ? 0 : -1);
    }

	@Test
    public void testJDK8Lambda(){
        List<Integer> list = Arrays.asList(1, 3, 4, 2, 5);
        list.stream().forEach((v)->{
            System.out.println(v);
        });
        list.sort(this::lambdaSortFun);
        list.stream().forEach(this::lambdaPrintFun);
    }

}
