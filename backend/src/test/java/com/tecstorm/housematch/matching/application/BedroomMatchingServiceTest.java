package com.tecstorm.housematch.matching.application;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;

import com.tecstorm.housematch.ai.MatchInput;
import com.tecstorm.housematch.matching.api.dto.BedroomMatchesResponse;
import com.tecstorm.housematch.matching.api.dto.PropertyMatchResponse;
import com.tecstorm.housematch.personality.application.PersonalityTraitService;
import com.tecstorm.housematch.personality.application.PropertyTraitService;
import com.tecstorm.housematch.profile.application.StudentService;
import com.tecstorm.housematch.property.domain.BedroomEntity;
import com.tecstorm.housematch.property.domain.PropertyEntity;
import com.tecstorm.housematch.profile.domain.StudentEntity;
import com.tecstorm.housematch.property.infrastructure.BedroomRepository;
import com.tecstorm.housematch.property.infrastructure.PropertyRepository;

class BedroomMatchingServiceTest {

    @Test
    void returnsMatchesSortedByScoreDescending() {
        BedroomRepository bedroomRepository = Mockito.mock(BedroomRepository.class);
        PropertyRepository propertyRepository = Mockito.mock(PropertyRepository.class);
        StudentService studentService = Mockito.mock(StudentService.class);
        PersonalityTraitService personalityTraitService = Mockito.mock(PersonalityTraitService.class);
        PropertyTraitService propertyTraitService = Mockito.mock(PropertyTraitService.class);

        BedroomEntity lowMatch = bedroom(
            UUID.randomUUID(),
            "Low Match",
            true,
            property(UUID.randomUUID(), "Property A")
        );
        BedroomEntity highMatch = bedroom(
            UUID.randomUUID(),
            "High Match",
            true,
            property(UUID.randomUUID(), "Property B")
        );

        when(bedroomRepository.findAll()).thenReturn(List.of(lowMatch, highMatch));
        UUID studentId = UUID.randomUUID();
        StudentEntity student = Mockito.mock(StudentEntity.class);
        when(student.getId()).thenReturn(studentId);
        when(studentService.get(Mockito.any())).thenReturn(student);
        when(personalityTraitService.getMatchInput(Mockito.any())).thenReturn(new MatchInput(
            MatchInput.Schedule.BALANCED,
            MatchInput.Social.AMBIVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.BALANCED,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.MEDIUM
        ));
        when(propertyTraitService.getMatchInput(lowMatch.getProperty().getId())).thenReturn(new MatchInput(
            MatchInput.Schedule.NIGHT_OWL,
            MatchInput.Social.EXTROVERT,
            MatchInput.Preference.HIGH,
            MatchInput.Academic.INTENSIVE,
            MatchInput.Cleanliness.STRICT,
            MatchInput.Preference.HIGH
        ));
        when(propertyTraitService.getMatchInput(highMatch.getProperty().getId())).thenReturn(new MatchInput(
            MatchInput.Schedule.BALANCED,
            MatchInput.Social.AMBIVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.BALANCED,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.MEDIUM
        ));

        BedroomMatchingService service = new BedroomMatchingService(
            bedroomRepository,
            studentService,
            personalityTraitService,
            propertyTraitService,
            propertyRepository
        );

        BedroomMatchesResponse response = service.getMatchesByProfileId(UUID.randomUUID());

        assertEquals(2, response.matches().size());
        assertEquals("High Match", response.matches().getFirst().bedroom().title());
        assertEquals(100, response.matches().getFirst().score());
    }

    @Test
    void returnsPropertyMatchWithReasoning() {
        BedroomRepository bedroomRepository = Mockito.mock(BedroomRepository.class);
        PropertyRepository propertyRepository = Mockito.mock(PropertyRepository.class);
        StudentService studentService = Mockito.mock(StudentService.class);
        PersonalityTraitService personalityTraitService = Mockito.mock(PersonalityTraitService.class);
        PropertyTraitService propertyTraitService = Mockito.mock(PropertyTraitService.class);

        UUID propertyId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentEntity student = Mockito.mock(StudentEntity.class);
        when(student.getId()).thenReturn(studentId);
        when(studentService.get(Mockito.any())).thenReturn(student);

        PropertyEntity property = property(propertyId, "Property Match");
        when(propertyRepository.findById(propertyId)).thenReturn(java.util.Optional.of(property));

        MatchInput input = new MatchInput(
            MatchInput.Schedule.BALANCED,
            MatchInput.Social.AMBIVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.BALANCED,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.MEDIUM
        );
        when(personalityTraitService.getMatchInput(studentId)).thenReturn(input);
        when(propertyTraitService.getMatchInput(propertyId)).thenReturn(input);

        BedroomMatchingService service = new BedroomMatchingService(
            bedroomRepository,
            studentService,
            personalityTraitService,
            propertyTraitService,
            propertyRepository
        );

        PropertyMatchResponse response = service.getPropertyMatch(propertyId, UUID.randomUUID());

        assertEquals("Property Match", response.property().title());
        assertEquals(100, response.score());
        assertEquals("schedule", response.reasoning().getFirst().trait());
        assertEquals("BALANCED", response.reasoning().getFirst().propertyValue());
    }

    @Test
    void distanceImpactsRankingWhenTraitsAreEqual() {
        BedroomRepository bedroomRepository = Mockito.mock(BedroomRepository.class);
        PropertyRepository propertyRepository = Mockito.mock(PropertyRepository.class);
        StudentService studentService = Mockito.mock(StudentService.class);
        PersonalityTraitService personalityTraitService = Mockito.mock(PersonalityTraitService.class);
        PropertyTraitService propertyTraitService = Mockito.mock(PropertyTraitService.class);

        MatchInput input = new MatchInput(
            MatchInput.Schedule.BALANCED,
            MatchInput.Social.AMBIVERT,
            MatchInput.Preference.MEDIUM,
            MatchInput.Academic.BALANCED,
            MatchInput.Cleanliness.MODERATE,
            MatchInput.Preference.MEDIUM
        );

        StudentEntity student = Mockito.mock(StudentEntity.class);
        when(student.getId()).thenReturn(UUID.randomUUID());
        when(student.getUniversity()).thenReturn("University of Lisbon");
        when(studentService.get(Mockito.any())).thenReturn(student);
        when(personalityTraitService.getMatchInput(Mockito.any())).thenReturn(input);

        BedroomEntity closeBedroom = bedroom(
            UUID.randomUUID(),
            "Close Bedroom",
            true,
            property(UUID.randomUUID(), "Close Property", 38.7527, -9.1567)
        );
        BedroomEntity farBedroom = bedroom(
            UUID.randomUUID(),
            "Far Bedroom",
            true,
            property(UUID.randomUUID(), "Far Property", 41.1779, -8.5950)
        );

        when(bedroomRepository.findAll()).thenReturn(List.of(farBedroom, closeBedroom));
        when(propertyTraitService.getMatchInput(closeBedroom.getProperty().getId())).thenReturn(input);
        when(propertyTraitService.getMatchInput(farBedroom.getProperty().getId())).thenReturn(input);

        BedroomMatchingService service = new BedroomMatchingService(
            bedroomRepository,
            studentService,
            personalityTraitService,
            propertyTraitService,
            propertyRepository
        );

        BedroomMatchesResponse response = service.getMatchesByProfileId(UUID.randomUUID());

        assertEquals("Close Bedroom", response.matches().getFirst().bedroom().title());
        assertTrue(response.matches().getFirst().score() > response.matches().get(1).score());
        assertTrue(response.matches().getFirst().breakdown().stream().anyMatch(item -> "distance".equals(item.trait())));
    }

    private static BedroomEntity bedroom(UUID id, String title, boolean isActive, PropertyEntity property) {
        try {
            BedroomEntity entity = new BedroomEntity(property, title, 1, 1, 500, LocalDate.now(), LocalDate.now().plusMonths(6), 3);
            setField(entity, "id", id);
            setField(entity, "isActive", isActive);
            return entity;
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException(e);
        }
    }

    private static PropertyEntity property(UUID id, String title) {
        return property(id, title, 0.0, 0.0);
    }

    private static PropertyEntity property(UUID id, String title, double lat, double lng) {
        try {
            PropertyEntity entity = new PropertyEntity(title, "Address", lat, lng, 1);
            setField(entity, "id", id);
            setField(entity, "totalPeople", 1);
            setField(entity, "totalBedrooms", 1);
            setField(entity, "dishwasher", false);
            setField(entity, "parking", false);
            setField(entity, "ac", false);
            setField(entity, "wifi", true);
            return entity;
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException(e);
        }
    }

    private static void setField(Object target, String name, Object value) throws ReflectiveOperationException {
        var field = target.getClass().getDeclaredField(name);
        field.setAccessible(true);
        field.set(target, value);
    }
}
