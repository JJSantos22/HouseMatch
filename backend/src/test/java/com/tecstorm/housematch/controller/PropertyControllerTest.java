package com.tecstorm.housematch.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.tecstorm.housematch.dto.BedroomMatchResponse;
import com.tecstorm.housematch.dto.BedroomMatchesResponse;
import com.tecstorm.housematch.dto.PropertyTraitsResponse;
import com.tecstorm.housematch.dto.BedroomResponse;
import com.tecstorm.housematch.dto.PropertyResponse;
import com.tecstorm.housematch.dto.TraitMatchBreakdownResponse;
import com.tecstorm.housematch.service.BedroomMatchingService;
import com.tecstorm.housematch.service.BedroomService;
import com.tecstorm.housematch.service.PropertyService;
import com.tecstorm.housematch.service.PropertyTraitService;
import com.tecstorm.housematch.service.ReviewService;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class PropertyControllerTest {

    @Test
    void returnsRankedMatches() throws Exception {
        PropertyService propertyService = org.mockito.Mockito.mock(PropertyService.class);
        BedroomService bedroomService = org.mockito.Mockito.mock(BedroomService.class);
        ReviewService reviewService = org.mockito.Mockito.mock(ReviewService.class);
        BedroomMatchingService bedroomMatchingService = org.mockito.Mockito.mock(BedroomMatchingService.class);
        PropertyTraitService propertyTraitService = org.mockito.Mockito.mock(PropertyTraitService.class);
        MockMvc mockMvc = mockMvc(propertyService, bedroomService, reviewService, bedroomMatchingService, propertyTraitService);

        UUID studentId = UUID.randomUUID();
        when(bedroomMatchingService.getMatchesByStudentId(studentId)).thenReturn(new BedroomMatchesResponse(List.of(
            new BedroomMatchResponse(
                new BedroomResponse(UUID.randomUUID(), "Room A", 1, 1, 500, null, true, false, null, null, 3, null, true),
                new PropertyResponse(UUID.randomUUID(), "Property A", "Address", 0.0, 0.0, 1, 1, 1, null, false, false, false, true, null, null),
                92,
                List.of(new TraitMatchBreakdownResponse("schedule", "BALANCED", "BALANCED", 15, 15, 100))
            )
        )));

        mockMvc.perform(get("/api/property/matches/student/{studentId}", studentId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.matches[0].score").value(92))
            .andExpect(jsonPath("$.matches[0].breakdown[0].trait").value("schedule"));
    }

    @Test
    void returnsPropertyTraits() throws Exception {
        PropertyService propertyService = org.mockito.Mockito.mock(PropertyService.class);
        BedroomService bedroomService = org.mockito.Mockito.mock(BedroomService.class);
        ReviewService reviewService = org.mockito.Mockito.mock(ReviewService.class);
        BedroomMatchingService bedroomMatchingService = org.mockito.Mockito.mock(BedroomMatchingService.class);
        PropertyTraitService propertyTraitService = org.mockito.Mockito.mock(PropertyTraitService.class);
        MockMvc mockMvc = mockMvc(propertyService, bedroomService, reviewService, bedroomMatchingService, propertyTraitService);

        UUID propertyId = UUID.randomUUID();
        when(propertyTraitService.get(propertyId)).thenReturn(new PropertyTraitsResponse(
            com.tecstorm.housematch.entities.PersonalityLevel.BALANCED,
            com.tecstorm.housematch.entities.PersonalityLevel.AMBIVERT,
            com.tecstorm.housematch.entities.PersonalityLevel.MEDIUM,
            com.tecstorm.housematch.entities.PersonalityLevel.BALANCED,
            com.tecstorm.housematch.entities.PersonalityLevel.MODERATE,
            com.tecstorm.housematch.entities.PersonalityLevel.MEDIUM
        ));

        mockMvc.perform(get("/api/property/{propertyId}/traits", propertyId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.schedule").value("BALANCED"))
            .andExpect(jsonPath("$.guest_frequency").value("MEDIUM"));
    }

    @Test
    void updatesPropertyTraits() throws Exception {
        PropertyService propertyService = org.mockito.Mockito.mock(PropertyService.class);
        BedroomService bedroomService = org.mockito.Mockito.mock(BedroomService.class);
        ReviewService reviewService = org.mockito.Mockito.mock(ReviewService.class);
        BedroomMatchingService bedroomMatchingService = org.mockito.Mockito.mock(BedroomMatchingService.class);
        PropertyTraitService propertyTraitService = org.mockito.Mockito.mock(PropertyTraitService.class);
        MockMvc mockMvc = mockMvc(propertyService, bedroomService, reviewService, bedroomMatchingService, propertyTraitService);

        UUID propertyId = UUID.randomUUID();

        mockMvc.perform(put("/api/property/{propertyId}/traits", propertyId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "schedule": "BALANCED",
                      "social": "AMBIVERT",
                      "noise": "MEDIUM",
                      "academic": "BALANCED",
                      "cleanliness": "MODERATE",
                      "guest_frequency": "MEDIUM"
                    }
                    """))
            .andExpect(status().isNoContent());
    }

    @Test
    void rebuildsPropertyEmbedding() throws Exception {
        PropertyService propertyService = org.mockito.Mockito.mock(PropertyService.class);
        BedroomService bedroomService = org.mockito.Mockito.mock(BedroomService.class);
        ReviewService reviewService = org.mockito.Mockito.mock(ReviewService.class);
        BedroomMatchingService bedroomMatchingService = org.mockito.Mockito.mock(BedroomMatchingService.class);
        PropertyTraitService propertyTraitService = org.mockito.Mockito.mock(PropertyTraitService.class);
        MockMvc mockMvc = mockMvc(propertyService, bedroomService, reviewService, bedroomMatchingService, propertyTraitService);

        UUID propertyId = UUID.randomUUID();

        mockMvc.perform(post("/api/property/{propertyId}/embedding/rebuild", propertyId))
            .andExpect(status().isNoContent());
    }

    private MockMvc mockMvc(
        PropertyService propertyService,
        BedroomService bedroomService,
        ReviewService reviewService,
        BedroomMatchingService bedroomMatchingService,
        PropertyTraitService propertyTraitService
    ) {
        return MockMvcBuilders.standaloneSetup(
                new PropertyController(propertyService, bedroomService, reviewService, bedroomMatchingService, propertyTraitService))
            .build();
    }
}
