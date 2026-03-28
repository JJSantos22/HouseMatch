package com.tecstorm.housematch.personality.infrastructure;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.tecstorm.housematch.personality.domain.PersonalityCategory;
import com.tecstorm.housematch.personality.domain.PersonalityTraitEntity;
import com.tecstorm.housematch.personality.domain.UserPersonalityTraitEntity;
import com.tecstorm.housematch.personality.domain.UserPersonalityTraitId;

public interface UserPersonalityTraitRepository extends JpaRepository<UserPersonalityTraitEntity, UserPersonalityTraitId> {
    @Query("SELECT p FROM UserPersonalityTraitEntity u JOIN PersonalityTraitEntity p ON u.personalityTraitId = p.id WHERE u.studentId = :studentId")
    List<PersonalityTraitEntity> findTraitsByStudentId(UUID studentId);

    @Modifying
    @Query("DELETE FROM UserPersonalityTraitEntity u WHERE u.studentId = :studentId AND u.personalityTraitId IN (SELECT p.id FROM PersonalityTraitEntity p WHERE p.category = :category)")
    void deleteByStudentIdAndCategory(UUID studentId, PersonalityCategory category);
}
