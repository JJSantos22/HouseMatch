package com.tecstorm.housematch.searchpreference.application;

import com.tecstorm.housematch.searchpreference.api.dto.UpdateSearchPreferenceRequest;
import com.tecstorm.housematch.searchpreference.domain.SearchPreferenceEntity;
import com.tecstorm.housematch.searchpreference.infrastructure.SearchPreferenceRepository;
import com.tecstorm.housematch.profile.application.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

@Service
public class SearchPreferenceService {

    private final SearchPreferenceRepository searchPreferenceRepository;
    private final StudentService studentService;

    public SearchPreferenceService(SearchPreferenceRepository searchPreferenceRepository, StudentService studentService) {
        this.searchPreferenceRepository = searchPreferenceRepository;
        this.studentService = studentService;
    }

    @Transactional
    public void update(UUID profileId, UpdateSearchPreferenceRequest request) {
        UUID studentId = studentService.get(profileId).getId();
        SearchPreferenceEntity pref = searchPreferenceRepository.findByStudent_Id(studentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Search preferences not found"));

        pref.setMinPrice(request.minPrice());
        pref.setMaxPrice(request.maxPrice());
        pref.setMinStayMonths(request.minStayMonths());
        pref.setAvailableFrom(request.availableFrom());
        pref.setFurnished(request.furnished());
        pref.setPrivateBath(request.privateBath());
        pref.setPrivateRoom(request.privateRoom());
        pref.setMaxRoommates(request.maxRoommates());
        pref.setMaxBedrooms(request.maxBedrooms());
        pref.setDishwasher(request.dishwasher());
        pref.setParking(request.parking());
        pref.setAc(request.ac());
        pref.setWifi(request.wifi());
        pref.setLaundry(request.laundry());
        pref.setCenterLat(request.centerLat());
        pref.setCenterLng(request.centerLng());
        pref.setRadiusKm(request.radiusKm());

        searchPreferenceRepository.save(pref);
    }
}
