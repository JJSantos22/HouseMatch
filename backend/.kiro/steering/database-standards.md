---
inclusion: always
---

## DB Rules
- Supabase (Postgres)
- Supabase Documentation: https://supabase.com/docs
- Singular table names
- Migrations: supabase/migrations/<timestamp>_name.sql

## JPA 
- Entities: {name}Entity.java
- Getters and setters only when required
- Use constructor over setters
- Always use @Column
- Prefer JOINs over multiple queries when fetching related data