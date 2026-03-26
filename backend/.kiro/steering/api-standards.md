---
inclusion: always
---

# API Standards
- Every endpoint should get the X-User-Id header, that represents the authenticated user. 
  - Unless it does not require the user to filter information. Example: Get Property By Id does not depend on the user
- Return and receive DTOs with @JsonProperty

# Postman
- Always update postman/collections/collection.json when creating or updating an endpoint 
- Postman environment vars: postman/environments/local.json
- baseUrl already includes "/api"
