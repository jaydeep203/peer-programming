package com.jaydeep.PeerPro.service.Impl;

import com.jaydeep.PeerPro.Entities.File;
import com.jaydeep.PeerPro.Entities.Project;
import com.jaydeep.PeerPro.repository.FileRepository;
import com.jaydeep.PeerPro.repository.ProjectRepository;
import com.jaydeep.PeerPro.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ProjectRepository projectRepository;

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


}
