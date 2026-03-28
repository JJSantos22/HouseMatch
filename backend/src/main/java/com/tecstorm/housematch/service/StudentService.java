package com.tecstorm.housematch.service;

import com.tecstorm.housematch.dto.UpdateProfileRequest;
import com.tecstorm.housematch.entities.Student.StudentEntity;
import com.tecstorm.housematch.repository.StudentRepository;
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
        StudentEntity student = get(profileId);
        student.setUniversity(request.university());
        studentRepository.save(student);
    }
}
