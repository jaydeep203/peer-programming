package com.jaydeep.PeerPro.Response;

public class JwtResponseDTO {
    private String message;
    private String accessToken;

    public JwtResponseDTO() {
    }

    public JwtResponseDTO(String message, String accessToken) {
        this.message = message;
        this.accessToken = accessToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
