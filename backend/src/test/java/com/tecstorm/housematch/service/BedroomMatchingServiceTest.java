package com.tecstorm.housematch.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;

import com.tecstorm.housematch.ai.MatchInput;
import com.tecstorm.housematch.dto.Bedroom.BedroomMatchesResponse;
import com.tecstorm.housematch.entities.Bedroom.BedroomEntity;
import com.tecstorm.housematch.entities.Property.PropertyEntity;
import com.tecstorm.housematch.entities.Student.StudentEntity;
import com.tecstorm.housematch.repository.BedroomRepository;

class BedroomMatchingServiceTest {

    @Test
    void returnsMatchesSortedByScoreDescending() {
        BedroomRepository bedroomRepository = Mockito.mock(BedroomRepository.class);
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
            propertyTraitService
        );

        BedroomMatchesResponse response = service.getMatchesByProfileId(UUID.randomUUID());

        assertEquals(2, response.matches().size());
        assertEquals("High Match", response.matches().getFirst().bedroom().title());
        assertEquals(100, response.matches().getFirst().score());
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
        try {
            PropertyEntity entity = new PropertyEntity(title, "Address", 0.0, 0.0, 1);
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
