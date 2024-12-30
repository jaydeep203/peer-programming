package com.jaydeep.PeerPro.controller;

import com.jaydeep.PeerPro.Entities.CollaborativeUpdate;
import com.jaydeep.PeerPro.Entities.CursorPosition;
import com.jaydeep.PeerPro.Entities.File;
import com.jaydeep.PeerPro.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollaborationController {

    @Autowired
    private FileService fileService;

    @MessageMapping("/edit/{projectId}")
    @SendTo("/topic/edit/{projectId}")
    public CollaborativeUpdate handleEdit(CollaborativeUpdate update){
        File file = fileService.getFile(update.getFileId());
        if(file!=null){
            file.setContent(update.getContent());
            fileService.editFile(file.getId(), file);
        }

        return update;
    }

    @MessageMapping("/cursor/{projectId}")
    @SendTo("/topic/cursor/{projectId}")
    public CursorPosition handleCursor(CursorPosition cursorPosition){
        return cursorPosition;
    }

}
