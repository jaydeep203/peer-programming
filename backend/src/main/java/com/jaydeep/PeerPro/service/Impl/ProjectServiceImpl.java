package com.jaydeep.PeerPro.service.Impl;

import com.jaydeep.PeerPro.Entities.Project;
import com.jaydeep.PeerPro.Entities.User;
import com.jaydeep.PeerPro.repository.ProjectRepository;
import com.jaydeep.PeerPro.repository.UserRepository;
import com.jaydeep.PeerPro.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project createProject(Project project, String username) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));
        if(userOptional.isPresent()){
            User user = new User();
            user.setUserId(userOptional.get().getUserId());
            project.setUser(user);
            projectRepository.save(project);
            return project;
        }
        return null;
    }

    @Override
    public boolean deleteProject(String id) {
        try{
            projectRepository.deleteById(id);
            return true;
        }catch (Exception ex){
            return false;
        }
    }

    @Override
    public boolean updateProject(String id, Project updatedProject) {

        Optional<Project> projectOptional = projectRepository.findById(id);
        if(projectOptional.isPresent()){
            Project project = projectOptional.get();
            if(updatedProject.getName()!=null){
                project.setName(updatedProject.getName());
            }
            if(updatedProject.getDescription()!=null){
                project.setDescription(updatedProject.getDescription());
            }
            if(updatedProject.getVisibility()!=null){
                project.setVisibility(updatedProject.getVisibility());
            }
            projectRepository.save(project);
            return true;
        }

        return false;
    }

    @Override
    public Project getProject(String id, String username) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        if(projectOptional.isPresent()){
            Project project = projectOptional.get();
            String projectOwner = project.getUser().getUsername();
            if(Objects.equals(project.getVisibility(), "Public") || (Objects.equals(projectOwner, username))){
                return project;
            }
        }

        return null;
    }

    @Override
    public List<Project> findByUserId(String userId) {
        Optional<List<Project>> projectOptional = Optional.ofNullable(projectRepository.findByUser_UserId(userId));
        if(projectOptional.isPresent()){
            List<Project> projects = projectOptional.get();
            return projects;
        }
        return null;
    }


}
