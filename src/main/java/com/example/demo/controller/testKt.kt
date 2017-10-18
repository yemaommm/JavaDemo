package com.example.demo.controller

import com.example.demo.dao.aa
import com.example.demo.dao.admin_auth
import com.example.demo.mapper.AdminMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class testKt{

    @Autowired
    val sm: AdminMapper? = null

    @GetMapping("/kt/test")
    fun test(@RequestParam("id") id:String): aa? {
        //language=GenericSQL
        return sm?.find();
    }


    @GetMapping("/")
    fun test2() = "///////////////////////"


    @GetMapping("/admin")
    fun test3() = "/////////admin//////////"
    @GetMapping("/admin2")
    fun test4() = "/////////admin2//////////"
    @GetMapping("/admin3")
    fun test5() = "/////////admin2//////////"
}