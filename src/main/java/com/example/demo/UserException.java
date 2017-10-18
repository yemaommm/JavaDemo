package com.example.demo;

import org.springframework.dao.DataAccessException;

public class UserException extends DataAccessException {

    private static final long serialVersionUID = 8901479830692029025L;

    public UserException(String msg) {
        super(msg);
    }
}
