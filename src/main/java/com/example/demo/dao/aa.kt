package com.example.demo.dao

class aa{
    private var _username: String? = null
    public var username:String?
        get() = _username
        set(value) {
            _username = value
        }
    private var _passwd: String? = null
    public var passwd:String?
        get() = _passwd
        set(value) {
            _passwd = value
        }

    var _idi:Int? = null
    var idi:Int?
        get() = _idi
        set(value){
            _idi = value?.toInt()
        }
}