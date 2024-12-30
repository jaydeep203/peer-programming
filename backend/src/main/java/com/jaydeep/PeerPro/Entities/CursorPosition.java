package com.jaydeep.PeerPro.Entities;




public class CursorPosition {

    private String username;
    private int line;
    private int column;

    public CursorPosition() {
    }

    public CursorPosition(String username, int line, int column) {
        this.username = username;
        this.line = line;
        this.column = column;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }
}
