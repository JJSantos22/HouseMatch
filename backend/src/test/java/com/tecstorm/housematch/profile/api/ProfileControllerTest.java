package com.tecstorm.housematch.profile.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.tecstorm.housematch.profile.application.ProfileService;
import com.tecstorm.housematch.searchpreference.application.SearchPreferenceService;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class ProfileControllerTest {

    @Test
    void rebuildsProfileEmbedding() throws Exception {
        ProfileService profileService = org.mockito.Mockito.mock(ProfileService.class);
        SearchPreferenceService searchPreferenceService = org.mockito.Mockito.mock(SearchPreferenceService.class);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(
            new ProfileController(profileService, searchPreferenceService)
        ).build();

        UUID userId = UUID.randomUUID();

        mockMvc.perform(post("/api/profile/{userId}/embedding/rebuild", userId))
            .andExpect(status().isNoContent());
    }
}
