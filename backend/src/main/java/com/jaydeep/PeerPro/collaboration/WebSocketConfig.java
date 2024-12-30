package com.jaydeep.PeerPro.collaboration;

import com.jaydeep.PeerPro.auth.JwtService;
import com.jaydeep.PeerPro.auth.MyUserDetailsService;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtService jwtService;
    private final MyUserDetailsService userDetailsService;

    public WebSocketConfig(JwtService jwtService, MyUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173")
                .addInterceptors(new JwtHandshakeInterceptor(jwtService, userDetailsService))
                .withSockJS();
    }

}
