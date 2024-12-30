package com.jaydeep.PeerPro.repository;

import com.jaydeep.PeerPro.Entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    List<Project> findByUser_UserId(String userId);
}
