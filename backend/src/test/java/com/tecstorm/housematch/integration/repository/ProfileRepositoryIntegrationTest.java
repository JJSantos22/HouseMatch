package com.tecstorm.housematch.integration.repository;

import com.tecstorm.housematch.entities.ProfileEntity;
import com.tecstorm.housematch.repository.ProfileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ProfileRepositoryIntegrationTest {

    @Autowired
    private ProfileRepository profileRepository;

    @Test
    void listAllProfiles() {
        List<ProfileEntity> profiles = profileRepository.findAll();
        assertNotNull(profiles);
        profiles.forEach(p -> System.out.println(p.getName() + " - " + p.getRole()));
    }
}
