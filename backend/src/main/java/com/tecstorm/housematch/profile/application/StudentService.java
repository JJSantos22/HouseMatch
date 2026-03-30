package com.tecstorm.housematch.profile.application;

import com.tecstorm.housematch.profile.api.dto.UpdateProfileRequest;
import com.tecstorm.housematch.profile.domain.StudentEntity;
import com.tecstorm.housematch.profile.infrastructure.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentEntity get(UUID profileId) {
        return studentRepository.findByProfileId(profileId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public StudentEntity getById(UUID studentId) {
        return studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void update(UUID profileId, UpdateProfileRequest request) {
        // University is set during registration and is no longer updated via profile endpoint.
        get(profileId);
    }
}
