package com.tecstorm.housematch.favorite.infrastructure;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecstorm.housematch.favorite.domain.StudentFavoriteEntity;
import com.tecstorm.housematch.favorite.domain.StudentFavoriteId;

public interface StudentFavoriteRepository extends JpaRepository<StudentFavoriteEntity, StudentFavoriteId> {
    List<StudentFavoriteEntity> findByStudentId(UUID studentId);
    boolean existsByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
    void deleteByStudentIdAndBedroomId(UUID studentId, UUID bedroomId);
}
