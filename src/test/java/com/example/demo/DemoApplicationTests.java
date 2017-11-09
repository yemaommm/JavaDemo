package com.example.demo;

import com.example.demo.dao.Permission;
import com.example.demo.service.cacheService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.LocalHostUriTemplateHandler;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.client.RootUriTemplateHandler;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriTemplateHandler;
import org.springframework.web.util.UriTemplateHandler;

import javax.annotation.Resource;
import java.io.IOException;
import java.lang.reflect.Field;
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

	@Before
	public void init() throws NoSuchFieldException, IllegalAccessException {
        restTemplate.setUriTemplateHandler(new RootUriTemplateHandler(HOST + ":" + port));
    }

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
//		boolean ret = this.doObject("/test/testaop", boolean.class);
        Boolean ret = restTemplate.getForObject("/test/testaop", boolean.class);
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

    @Test
    public void putObject(){
        String forObject = restTemplate.getForObject("/test/putObject", String.class);
        System.out.println(forObject);
    }

    @Test
    public void  getObject(){
        String data = "{\"id\":0,\"username\":\"\",\"passwd\":null,\"token\":null,\"tel\":null,\"group\":0,\"qrcode\":null,\"createtime\":null}";

        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        HttpEntity<String> formEntity = new HttpEntity<String>(data, headers);

        ResponseEntity<String> stringResponseEntity =
                restTemplate.postForEntity("/test/testObject", formEntity, String.class);
        System.out.println(stringResponseEntity.getBody());
    }

}
