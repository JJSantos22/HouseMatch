package com.tecstorm.housematch.favorite.application;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.tecstorm.housematch.property.api.dto.BedroomDetailResponse;
import com.tecstorm.housematch.property.api.dto.BedroomResponse;
import com.tecstorm.housematch.property.api.dto.PropertyResponse;
import com.tecstorm.housematch.property.domain.BedroomEntity;
import com.tecstorm.housematch.property.domain.PropertyEntity;
import com.tecstorm.housematch.favorite.domain.StudentFavoriteEntity;
import com.tecstorm.housematch.property.infrastructure.BedroomRepository;
import com.tecstorm.housematch.favorite.infrastructure.StudentFavoriteRepository;
import com.tecstorm.housematch.profile.infrastructure.StudentRepository;

@Service
public class FavoriteService {

    private final StudentFavoriteRepository studentFavoriteRepository;
    private final StudentRepository studentRepository;
    private final BedroomRepository bedroomRepository;

    public FavoriteService(StudentFavoriteRepository studentFavoriteRepository,
                           StudentRepository studentRepository,
                           BedroomRepository bedroomRepository) {
        this.studentFavoriteRepository = studentFavoriteRepository;
        this.studentRepository = studentRepository;
        this.bedroomRepository = bedroomRepository;
    }

    public List<BedroomDetailResponse> getFavorites(UUID profileId) {
        UUID studentId = getStudentId(profileId);
        return studentFavoriteRepository.findByStudentId(studentId).stream()
                .map(StudentFavoriteEntity::getBedroom)
                .map(this::toDetailResponse)
                .toList();
    }

    @Transactional
    public void addFavorite(UUID profileId, UUID bedroomId) {
        UUID studentId = getStudentId(profileId);
        if (!bedroomRepository.existsById(bedroomId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bedroom not found");
        }
        if (studentFavoriteRepository.existsByStudentIdAndBedroomId(studentId, bedroomId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already in favorites");
        }
        studentFavoriteRepository.save(new StudentFavoriteEntity(studentId, bedroomId));
    }

    @Transactional
    public void removeFavorite(UUID profileId, UUID bedroomId) {
        UUID studentId = getStudentId(profileId);
        if (!studentFavoriteRepository.existsByStudentIdAndBedroomId(studentId, bedroomId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Favorite not found");
        }
        studentFavoriteRepository.deleteByStudentIdAndBedroomId(studentId, bedroomId);
    }

    private UUID getStudentId(UUID profileId) {
        return studentRepository.findByProfileId(profileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"))
                .getId();
    }

    private BedroomDetailResponse toDetailResponse(BedroomEntity b) {
        PropertyEntity p = b.getProperty();
        return new BedroomDetailResponse(
                new BedroomResponse(b.getId(), b.getTitle(), b.getTotalPeople(), b.getTotalBeds(), b.getPrice(), b.getSizeSqft(), b.getFurnished(), b.getPrivateBath(), b.getAvailableFromDate(), b.getAvailableToDate(), b.getMinStayMonths(), b.getPhotos(), b.getIsActive()),
                new PropertyResponse(p.getId(), p.getTitle(), p.getAddress(), p.getLat(), p.getLng(), p.getTotalPeople(), p.getTotalBedrooms(), p.getTotalBathrooms(), p.getLaundry(), p.getDishwasher(), p.getParking(), p.getAc(), p.getWifi(), p.getSizeSqft(), p.getPhotos())
        );
    }
}
