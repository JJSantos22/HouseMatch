package com.tecstorm.housematch.profile.infrastructure;

import com.tecstorm.housematch.profile.domain.ProfileEntity;
import com.tecstorm.housematch.profile.infrastructure.ProfileRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Disabled("Requires a running local Postgres/Supabase instance")
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
