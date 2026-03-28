package com.tecstorm.housematch.repository;

import com.tecstorm.housematch.entities.StudentFavoriteEntity;
import com.tecstorm.housematch.entities.StudentFavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface StudentFavoriteRepository extends JpaRepository<StudentFavoriteEntity, StudentFavoriteId> {
    List<StudentFavoriteEntity> findByStudentId(UUID studentId);
    boolean existsByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
    void deleteByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
}
