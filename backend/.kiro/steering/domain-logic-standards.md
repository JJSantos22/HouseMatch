---
inclusion: always
---
# Backend Rules
- Services: prefer DTOs, entities OK if similar
- Always use Record Classes
- Repositories are only accessible by the respective service
  - Ex: StudentService is the only one that can access the StudentRepository
- Only warning comments
- Enum values: UPPER_SNAKE_CASE
- When refactoring: delete unused methods and update dependent code