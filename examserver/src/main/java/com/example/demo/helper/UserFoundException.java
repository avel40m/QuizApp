package com.example.demo.helper;

public class UserFoundException extends Exception{
    public UserFoundException(){
        super("User with this username not found in database!!");
    }

    public UserFoundException(String msg){
        super(msg);
    }

}
