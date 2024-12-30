package com.jaydeep.PeerPro.Entities;



public class CollaborativeUpdate {
    private String fileId;
    private String content;
    private String username;

    public CollaborativeUpdate() {
    }

    public CollaborativeUpdate(String fileId, String content, String username) {
        this.fileId = fileId;
        this.content = content;
        this.username = username;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
