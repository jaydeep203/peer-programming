package com.jaydeep.PeerPro.service;


import com.jaydeep.PeerPro.Entities.File;
import com.jaydeep.PeerPro.Response.ExecutionResponse;

public interface FileService {

    File getFile(String id);

    void createFile(File file, String projectId);

    boolean deleteFile(String id);

    boolean editFile(String id, File editedFile);

    ExecutionResponse executeCode(String id);
}
