package com.tecstorm.housematch.profile.application;

import com.tecstorm.housematch.profile.api.dto.ProfileResponse;
import com.tecstorm.housematch.profile.domain.UserRole;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Disabled("Requires a running local Postgres/Supabase instance")
class ProfileServiceIntegrationTest {

    @Autowired
    private ProfileService profileService;

    @Test
    void getStudentProfile() {
        UUID profileId = UUID.fromString("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
        ProfileResponse response = profileService.getProfile(profileId);

        assertEquals("John Student", response.name());
        assertEquals(UserRole.student, response.role());
        assertEquals("University of Lisbon", response.university());
        assertNull(response.phone());
        assertEquals("student@test.com", response.email());
        assertNotNull(response.studentId());
    }

    @Test
    void getLandlordProfile() {
        UUID landlordId = UUID.fromString("b2c3d4e5-f6a7-8901-bcde-f12345678901");
        ProfileResponse response = profileService.getProfile(landlordId);

        assertEquals("Jane Landlord", response.name());
        assertEquals(UserRole.landlord, response.role());
        assertNull(response.university());
        assertEquals("+351912345678", response.phone());
        assertEquals("landlord@test.com", response.email());
        assertNull(response.studentId());
    }
}
