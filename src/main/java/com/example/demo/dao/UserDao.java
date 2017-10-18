package com.example.demo.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserDao {

    @Select("SELECT * FROM sys_user WHERE username = #{username} LIMIT 1")
    SysUser findByUserName(String username);
}
