package com.jaydeep.PeerPro.auth;

import com.jaydeep.PeerPro.Entities.User;
import com.jaydeep.PeerPro.Response.JwtResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return service.register(user);
    }

    @PostMapping("/login")
    public JwtResponseDTO login(@RequestBody User user){
        System.out.println("Login");
        String token = service.verify(user);
        return new JwtResponseDTO("Welcome Back", token);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        User user = service.getUser(username);
        Map<String, Object> response = new HashMap<>();

        if(user!=null){
            response.put("message", "verified token.");
            response.put("user", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("message", "Invalid token");
        response.put("user", null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }


}
