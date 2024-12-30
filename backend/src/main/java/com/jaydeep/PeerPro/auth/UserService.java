package com.jaydeep.PeerPro.auth;

import com.jaydeep.PeerPro.Entities.User;
import com.jaydeep.PeerPro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtService service;

    @Autowired
    AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String verify(User user) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated())
            return service.generateToken(user.getUsername());

        return "fail";
    }

    public User getUser(String username){
        Optional<User> userOptional = Optional.ofNullable(repo.findByUsername(username));
        if(userOptional.isPresent()){
            User user = new User();
            user.setEmail(userOptional.get().getEmail());
            user.setName(userOptional.get().getName());
            user.setBio(userOptional.get().getBio());
            user.setUsername(userOptional.get().getUsername());
            user.setProfilePic(userOptional.get().getProfilePic());
            user.setUserId(userOptional.get().getUserId());
            return user;
        }

        return null;
    }

}
