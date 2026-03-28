package com.tecstorm.housematch.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.entities.Student.StudentFavoriteEntity;
import com.tecstorm.housematch.entities.Student.StudentFavoriteId;

public interface StudentFavoriteRepository extends JpaRepository<StudentFavoriteEntity, StudentFavoriteId> {
    List<StudentFavoriteEntity> findByStudentId(UUID studentId);
    boolean existsByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
    void deleteByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
}
