package com.jaydeep.PeerPro.service.Impl;

import com.jaydeep.PeerPro.Entities.File;
import com.jaydeep.PeerPro.Entities.Project;
import com.jaydeep.PeerPro.Response.ExecutionResponse;
import com.jaydeep.PeerPro.repository.FileRepository;
import com.jaydeep.PeerPro.repository.ProjectRepository;
import com.jaydeep.PeerPro.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public File getFile(String id) {
        return fileRepository.findById(id).orElse(null);
    }

    @Override
    public void createFile(File file, String projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if(projectOptional.isPresent()){
            Project project = projectOptional.get();
            project.setFile(file);
            projectRepository.save(project);
        }
    }

    @Override
    public boolean deleteFile(String id) {
        try{
            fileRepository.deleteById(id);
            return true;
        }catch (Exception ex){
            return false;
        }

    }

    @Override
    public boolean editFile(String id, File editedFile) {

        Optional<File> fileOptional = fileRepository.findById(id);
        if(fileOptional.isPresent()){
            File file = fileOptional.get();
            file.setContent(editedFile.getContent());
            file.setLanguage(editedFile.getLanguage());
            fileRepository.save(file);
            return true;
        }
        return false;
    }


    @Override
    public ExecutionResponse executeCode(String id, String input){
        String apiUrl = "https://api.codex.jaagrav.in/";
        File file = getFile(id);
        String code = file.getContent()
                .replace("\\\\", "\\")  // Escape backslashes
                .replace("\\\"", "\"")  // Escape double quotes
                .replace("\\n", "\n")  // Escape newlines
                .replace("\\r", "\r");
        Map<String, String> requestPayload = new HashMap<>();
        requestPayload.put("code", code);
        requestPayload.put("language", file.getLanguage());
        requestPayload.put("input", input);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestPayload, headers);

        ResponseEntity<ExecutionResponse> response = restTemplate.postForEntity(apiUrl, requestEntity, ExecutionResponse.class);
        return response.getBody();
    }


}
