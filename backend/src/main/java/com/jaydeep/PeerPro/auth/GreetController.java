package com.jaydeep.PeerPro.auth;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetController {
    @GetMapping("/")
    public String greet(){
        return "Hello from server";
    }

}
