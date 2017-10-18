package com.example.demo.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PermissionDao {

    @Select("select * from sys_permission")
    public List<Permission> findAll();

    @Select("select p.*" +
            "        from sys_user u" +
            "        LEFT JOIN sys_role_user sru on u.id= sru.sys_user_id" +
            "        LEFT JOIN sys_role r on sru.sys_role_id=r.id" +
            "        LEFT JOIN sys_permission_role spr on spr.role_id=r.id" +
            "        LEFT JOIN sys_permission p on p.id =spr.permission_id" +
            "        where u.id=#{userId}")
    public List<Permission> findByAdminUserId(long userId);
}
