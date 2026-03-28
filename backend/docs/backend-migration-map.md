# Backend Migration Map (Phase 1 -> Phase 2)

This map defines the planned class moves from the current layered structure to the target feature-first structure.

- Scope: package/file moves only
- Behavior: unchanged
- API paths: unchanged

## Main Source Mapping

| Current path | Target path |
|---|---|
| `src/main/java/com/tecstorm/housematch/Application.java` | `src/main/java/com/tecstorm/housematch/Application.java` |
| `src/main/java/com/tecstorm/housematch/config/CorsConfig.java` | `src/main/java/com/tecstorm/housematch/config/CorsConfig.java` |
| `src/main/java/com/tecstorm/housematch/controller/AuthController.java` | `src/main/java/com/tecstorm/housematch/auth/api/AuthController.java` |
| `src/main/java/com/tecstorm/housematch/controller/FavoriteController.java` | `src/main/java/com/tecstorm/housematch/favorite/api/FavoriteController.java` |
| `src/main/java/com/tecstorm/housematch/controller/ProfileController.java` | `src/main/java/com/tecstorm/housematch/profile/api/ProfileController.java` |
| `src/main/java/com/tecstorm/housematch/controller/PropertyController.java` | `src/main/java/com/tecstorm/housematch/property/api/PropertyController.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomDetailResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/BedroomDetailResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomMapResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/BedroomMapResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomMatchResponse.java` | `src/main/java/com/tecstorm/housematch/matching/api/dto/BedroomMatchResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomMatchesResponse.java` | `src/main/java/com/tecstorm/housematch/matching/api/dto/BedroomMatchesResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/BedroomResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Bedroom/BedroomsDetailResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/BedroomsDetailResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/LoginRequest.java` | `src/main/java/com/tecstorm/housematch/auth/api/dto/LoginRequest.java` |
| `src/main/java/com/tecstorm/housematch/dto/LoginResponse.java` | `src/main/java/com/tecstorm/housematch/auth/api/dto/LoginResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/PersonalityTraitsResponse.java` | `src/main/java/com/tecstorm/housematch/personality/api/dto/PersonalityTraitsResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/ProfileResponse.java` | `src/main/java/com/tecstorm/housematch/profile/api/dto/ProfileResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Property/PropertyMapResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/PropertyMapResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Property/PropertyMatchReasonResponse.java` | `src/main/java/com/tecstorm/housematch/matching/api/dto/PropertyMatchReasonResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Property/PropertyMatchResponse.java` | `src/main/java/com/tecstorm/housematch/matching/api/dto/PropertyMatchResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Property/PropertyResponse.java` | `src/main/java/com/tecstorm/housematch/property/api/dto/PropertyResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/Property/PropertyTraitsResponse.java` | `src/main/java/com/tecstorm/housematch/personality/api/dto/PropertyTraitsResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/RegisterRequest.java` | `src/main/java/com/tecstorm/housematch/auth/api/dto/RegisterRequest.java` |
| `src/main/java/com/tecstorm/housematch/dto/RegisterResponse.java` | `src/main/java/com/tecstorm/housematch/auth/api/dto/RegisterResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/ReviewResponse.java` | `src/main/java/com/tecstorm/housematch/review/api/dto/ReviewResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/TraitMatchBreakdownResponse.java` | `src/main/java/com/tecstorm/housematch/matching/api/dto/TraitMatchBreakdownResponse.java` |
| `src/main/java/com/tecstorm/housematch/dto/UpdateProfileRequest.java` | `src/main/java/com/tecstorm/housematch/profile/api/dto/UpdateProfileRequest.java` |
| `src/main/java/com/tecstorm/housematch/dto/UpdatePropertyTraitsRequest.java` | `src/main/java/com/tecstorm/housematch/personality/api/dto/UpdatePropertyTraitsRequest.java` |
| `src/main/java/com/tecstorm/housematch/dto/UpdateSearchPreferenceRequest.java` | `src/main/java/com/tecstorm/housematch/searchpreference/api/dto/UpdateSearchPreferenceRequest.java` |
| `src/main/java/com/tecstorm/housematch/entities/Bedroom/BedroomEntity.java` | `src/main/java/com/tecstorm/housematch/property/domain/BedroomEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/LandlordEntity.java` | `src/main/java/com/tecstorm/housematch/profile/domain/LandlordEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Laundry.java` | `src/main/java/com/tecstorm/housematch/property/domain/Laundry.java` |
| `src/main/java/com/tecstorm/housematch/entities/Personality/PersonalityCategory.java` | `src/main/java/com/tecstorm/housematch/personality/domain/PersonalityCategory.java` |
| `src/main/java/com/tecstorm/housematch/entities/Personality/PersonalityLevel.java` | `src/main/java/com/tecstorm/housematch/personality/domain/PersonalityLevel.java` |
| `src/main/java/com/tecstorm/housematch/entities/Personality/PersonalityTraitEntity.java` | `src/main/java/com/tecstorm/housematch/personality/domain/PersonalityTraitEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/ProfileEntity.java` | `src/main/java/com/tecstorm/housematch/profile/domain/ProfileEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Property/PropertyEntity.java` | `src/main/java/com/tecstorm/housematch/property/domain/PropertyEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Property/PropertyPersonalityTraitEntity.java` | `src/main/java/com/tecstorm/housematch/property/domain/PropertyPersonalityTraitEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Property/PropertyPersonalityTraitId.java` | `src/main/java/com/tecstorm/housematch/property/domain/PropertyPersonalityTraitId.java` |
| `src/main/java/com/tecstorm/housematch/entities/ReviewEntity.java` | `src/main/java/com/tecstorm/housematch/review/domain/ReviewEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/SearchPreferenceEntity.java` | `src/main/java/com/tecstorm/housematch/searchpreference/domain/SearchPreferenceEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Student/StudentEntity.java` | `src/main/java/com/tecstorm/housematch/profile/domain/StudentEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Student/StudentFavoriteEntity.java` | `src/main/java/com/tecstorm/housematch/favorite/domain/StudentFavoriteEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/Student/StudentFavoriteId.java` | `src/main/java/com/tecstorm/housematch/favorite/domain/StudentFavoriteId.java` |
| `src/main/java/com/tecstorm/housematch/entities/User/UserPersonalityTraitEntity.java` | `src/main/java/com/tecstorm/housematch/personality/domain/UserPersonalityTraitEntity.java` |
| `src/main/java/com/tecstorm/housematch/entities/User/UserPersonalityTraitId.java` | `src/main/java/com/tecstorm/housematch/personality/domain/UserPersonalityTraitId.java` |
| `src/main/java/com/tecstorm/housematch/entities/User/UserRole.java` | `src/main/java/com/tecstorm/housematch/profile/domain/UserRole.java` |
| `src/main/java/com/tecstorm/housematch/repository/BedroomRepository.java` | `src/main/java/com/tecstorm/housematch/property/infrastructure/BedroomRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/LandlordRepository.java` | `src/main/java/com/tecstorm/housematch/profile/infrastructure/LandlordRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/PersonalityTraitRepository.java` | `src/main/java/com/tecstorm/housematch/personality/infrastructure/PersonalityTraitRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/ProfileRepository.java` | `src/main/java/com/tecstorm/housematch/profile/infrastructure/ProfileRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/PropertyPersonalityTraitRepository.java` | `src/main/java/com/tecstorm/housematch/property/infrastructure/PropertyPersonalityTraitRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/PropertyRepository.java` | `src/main/java/com/tecstorm/housematch/property/infrastructure/PropertyRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/ReviewRepository.java` | `src/main/java/com/tecstorm/housematch/review/infrastructure/ReviewRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/SearchPreferenceRepository.java` | `src/main/java/com/tecstorm/housematch/searchpreference/infrastructure/SearchPreferenceRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/StudentFavoriteRepository.java` | `src/main/java/com/tecstorm/housematch/favorite/infrastructure/StudentFavoriteRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/StudentRepository.java` | `src/main/java/com/tecstorm/housematch/profile/infrastructure/StudentRepository.java` |
| `src/main/java/com/tecstorm/housematch/repository/UserPersonalityTraitRepository.java` | `src/main/java/com/tecstorm/housematch/personality/infrastructure/UserPersonalityTraitRepository.java` |
| `src/main/java/com/tecstorm/housematch/service/AuthService.java` | `src/main/java/com/tecstorm/housematch/auth/application/AuthService.java` |
| `src/main/java/com/tecstorm/housematch/service/BedroomMatchingService.java` | `src/main/java/com/tecstorm/housematch/matching/application/BedroomMatchingService.java` |
| `src/main/java/com/tecstorm/housematch/service/BedroomService.java` | `src/main/java/com/tecstorm/housematch/property/application/BedroomService.java` |
| `src/main/java/com/tecstorm/housematch/service/EmbeddingService.java` | `src/main/java/com/tecstorm/housematch/matching/domain/EmbeddingService.java` |
| `src/main/java/com/tecstorm/housematch/service/FavoriteService.java` | `src/main/java/com/tecstorm/housematch/favorite/application/FavoriteService.java` |
| `src/main/java/com/tecstorm/housematch/service/LandlordService.java` | `src/main/java/com/tecstorm/housematch/profile/application/LandlordService.java` |
| `src/main/java/com/tecstorm/housematch/service/PersonalityTraitService.java` | `src/main/java/com/tecstorm/housematch/personality/application/PersonalityTraitService.java` |
| `src/main/java/com/tecstorm/housematch/service/ProfileService.java` | `src/main/java/com/tecstorm/housematch/profile/application/ProfileService.java` |
| `src/main/java/com/tecstorm/housematch/service/PropertyService.java` | `src/main/java/com/tecstorm/housematch/property/application/PropertyService.java` |
| `src/main/java/com/tecstorm/housematch/service/PropertyTraitService.java` | `src/main/java/com/tecstorm/housematch/personality/application/PropertyTraitService.java` |
| `src/main/java/com/tecstorm/housematch/service/ReviewService.java` | `src/main/java/com/tecstorm/housematch/review/application/ReviewService.java` |
| `src/main/java/com/tecstorm/housematch/service/SearchPreferenceService.java` | `src/main/java/com/tecstorm/housematch/searchpreference/application/SearchPreferenceService.java` |
| `src/main/java/com/tecstorm/housematch/service/StudentService.java` | `src/main/java/com/tecstorm/housematch/profile/application/StudentService.java` |
| `src/main/java/com/tecstorm/housematch/service/TraitMatchInputMapper.java` | `src/main/java/com/tecstorm/housematch/matching/domain/TraitMatchInputMapper.java` |

## Test Source Mapping

| Current path | Target path |
|---|---|
| `src/test/java/com/tecstorm/housematch/ApplicationTests.java` | `src/test/java/com/tecstorm/housematch/ApplicationTests.java` |
| `src/test/java/com/tecstorm/housematch/controller/ProfileControllerTest.java` | `src/test/java/com/tecstorm/housematch/profile/api/ProfileControllerTest.java` |
| `src/test/java/com/tecstorm/housematch/controller/PropertyControllerTest.java` | `src/test/java/com/tecstorm/housematch/property/api/PropertyControllerTest.java` |
| `src/test/java/com/tecstorm/housematch/integration/controller/AuthControllerIntegrationTest.java` | `src/test/java/com/tecstorm/housematch/auth/api/AuthControllerIntegrationTest.java` |
| `src/test/java/com/tecstorm/housematch/integration/repository/ProfileRepositoryIntegrationTest.java` | `src/test/java/com/tecstorm/housematch/profile/infrastructure/ProfileRepositoryIntegrationTest.java` |
| `src/test/java/com/tecstorm/housematch/service/BedroomMatchingServiceTest.java` | `src/test/java/com/tecstorm/housematch/matching/application/BedroomMatchingServiceTest.java` |
| `src/test/java/com/tecstorm/housematch/service/ProfileServiceIntegrationTest.java` | `src/test/java/com/tecstorm/housematch/profile/application/ProfileServiceIntegrationTest.java` |

## Notes for Phase 2

- Move one feature at a time and run tests after each feature move.
- Update package declarations and imports in the same commit as the file move.
- Keep endpoint URLs and method signatures unchanged.
- Keep migrations and database schema unchanged.
