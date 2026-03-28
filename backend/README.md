# HouseMatch Backend

## App Standards
AI agents: see `.kiro/steering`. Keep all agent (ex: `.claude`) files in sync. 

## Architecture

- Target backend organization: `docs/backend-architecture.md`
- Phase migration map: `docs/backend-migration-map.md`
- Architecture guardrails: `src/test/java/com/tecstorm/housematch/common/infrastructure/ArchitectureRulesTest.java`

## Run Application (mvnw or mvn)

Local database:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

Remote Database:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

## Run Tests

```bash
./mvnw test
```

## Local Supabase

```bash
# Start database only (requires Docker)
supabase start -x gotrue,realtime,storage-api,imgproxy,kong,mailpit,postgrest,postgres-meta,studio,edge-runtime,logflare,supavisor

# Start all Supabase services
supabase start

# Reset local database and reapply migrations
supabase db reset

# Apply new migrations without reset
supabase migration up

# Stop local Supabase
supabase stop
```

### Local Database Connection (IntelliJ / DBeaver)

| Setting | Value |
|---------|-------|
| Host | `localhost` |
| Port | `54322` |
| Database | `postgres` |
| User | `postgres` |
| Password | `postgres` |

JDBC URL: `jdbc:postgresql://localhost:54322/postgres`

## Push migrations to Supabase

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link

# Set password and push migrations
export SUPABASE_DB_PASSWORD='your-password'
supabase db push
```

### Production Database Connection

| Setting | Value |
|---------|-------|
| Host | `db.<project-ref>.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| User | `postgres` |
| Password | `<your-database-password>` |

JDBC URL: `jdbc:postgresql://db.<project-ref>.supabase.co:5432/postgres`

Find these values in: Supabase Dashboard → Project Settings → Database
