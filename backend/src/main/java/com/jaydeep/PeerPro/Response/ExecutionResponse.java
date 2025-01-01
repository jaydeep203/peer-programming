package com.jaydeep.PeerPro.Response;

public class ExecutionResponse {

    private int status;
    private String output;
    private String error;
    private String language;
    private String info;

    public ExecutionResponse() {
    }

    public ExecutionResponse(int status, String output, String error, String language, String info) {
        this.status = status;
        this.output = output;
        this.error = error;
        this.language = language;
        this.info = info;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
