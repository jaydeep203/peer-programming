package com.jaydeep.PeerPro.repository;

import com.jaydeep.PeerPro.Entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
}
