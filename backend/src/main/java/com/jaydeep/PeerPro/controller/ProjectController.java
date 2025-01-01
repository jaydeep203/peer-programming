package com.jaydeep.PeerPro.controller;

import com.jaydeep.PeerPro.Entities.Project;
import com.jaydeep.PeerPro.Entities.User;
import com.jaydeep.PeerPro.auth.UserService;
import com.jaydeep.PeerPro.service.ProjectService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable String id){
            Project project = projectService.getProject(id);
            Map<String, Object> response = new HashMap<>();
            if(project!=null){
                response.put("message", "Project found.");
                response.put("project", project);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            response.put("message", "Project not found.");
            response.put("project", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAllProjects(@PathVariable String userId){
        List<Project> projects = projectService.findByUserId(userId);
        Map<String, Object> response = new HashMap<>();

        if(!projects.isEmpty()){
            response.put("message", "Projects Found.");
            response.put("projects", projects);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("message", "No projects found.");
        response.put("projects", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> createProject(@RequestBody Project project, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        Project pro = projectService.createProject(project, username);
        Map<String, Object> response = new HashMap<>();
        if(pro!=null){
            response.put("message", "Project has been created successfully.");
            response.put("project", pro);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        response.put("message", "Project not created.");
        response.put("project", null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable String id){
        boolean deleted = projectService.deleteProject(id);
        if(deleted){
            return new ResponseEntity<>("Project deleted successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Something went wrong.", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProject(@PathVariable String id,
                                                @RequestBody Project updatedProject){
        boolean updated = projectService.updateProject(id, updatedProject);
        if(updated){
            return new ResponseEntity<>("Project Edited...", HttpStatus.OK);
        }

        return new ResponseEntity<>("Project not found", HttpStatus.NOT_FOUND);
    }



}
