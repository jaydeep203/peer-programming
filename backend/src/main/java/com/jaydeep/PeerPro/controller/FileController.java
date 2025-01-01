package com.jaydeep.PeerPro.controller;

import com.jaydeep.PeerPro.Entities.File;
import com.jaydeep.PeerPro.Response.ExecutionResponse;
import com.jaydeep.PeerPro.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/{projectId}")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getFile(@PathVariable String id){
        File file = fileService.getFile(id);
        if(file!=null){
            return new ResponseEntity<>(file, HttpStatus.OK);
        }

        return new ResponseEntity<>("File not found.", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/")
    public ResponseEntity<?> createFile(@RequestBody File file, @PathVariable String projectId){
        fileService.createFile(file, projectId);
        return new ResponseEntity<>("File has been created successfully.", HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable String id){
        boolean deleted = fileService.deleteFile(id);
        if(deleted){
            return new ResponseEntity<>("file deleted successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Something went wrong.", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editFile(@PathVariable String id, @RequestBody File editedFile){
        boolean updated = fileService.editFile(id, editedFile);
        if(updated){
            return new ResponseEntity<>("File Edited...", HttpStatus.OK);
        }

        return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/execute")
    public ResponseEntity<?> executeCode(@PathVariable String projectId, @PathVariable String id){
         ExecutionResponse response = fileService.executeCode(id);
         return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
