package com.jaydeep.PeerPro.service;

import com.jaydeep.PeerPro.Entities.Project;

import java.util.List;
import java.util.Optional;


public interface ProjectService {
    Project createProject(Project project, String username);
    boolean deleteProject(String id);
    boolean updateProject(String id, Project updatedProject);

    Project getProject(String id, String username);

    List<Project> findByUserId(String userId);
}
