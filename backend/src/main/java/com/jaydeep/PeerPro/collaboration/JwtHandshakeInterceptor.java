package com.jaydeep.PeerPro.collaboration;

import com.jaydeep.PeerPro.auth.JwtService;
import com.jaydeep.PeerPro.auth.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private JwtService jwtService;

    private MyUserDetailsService userDetailsService;

    public JwtHandshakeInterceptor(JwtService jwtService, MyUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String query = request.getURI().getQuery();
        String token = null;
        String username = null;

        if (query != null && query.contains("token=")) {
            token = query.split("token=")[1];
        }

        if (token != null) {
            token = token.substring(7);
            System.out.println("Token - " + token);
            username = jwtService.extractUsername(token);
        }

        if (username != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.validateToken(token, userDetails)) {
                // Set authentication in the SecurityContext
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                return true;
            }
        }

        response.setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // No action needed here
    }
}
