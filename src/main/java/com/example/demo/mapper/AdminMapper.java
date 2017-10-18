package com.example.demo.mapper;

import com.example.demo.dao.aa;
import com.example.demo.dao.admin_auth;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {

    @Select("SELECT * FROM admin_auth LIMIT 1")
    aa find();

    @Select("SELECT * FROM admin_auth WHERE username = #{ aa.username } LIMIT 1")
    admin_auth findName(@Param("auth") admin_auth aa);

    admin_auth ffind();

    @Insert("INSERT INTO test (name) VALUES ('123')")
    int insert();

    @Select("SELECT * FROM i_user_favorite")
    List<Map<String, Object>> findall();


    @Select("SELECT 'user' AS username, 'password' AS password, 'USER,IUSER' AS role")
    Map<String, Object> finduser();
}
