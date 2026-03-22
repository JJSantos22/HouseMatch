# HouseMatch Backend

## Local Supabase

```bash
# Start local Supabase (requires Docker)
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
