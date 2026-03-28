# Backend Architecture (Phase 1)

This document defines the target package organization for the backend using a feature-first structure with strict internal layers:

- `api`: controllers and request/response contracts
- `application`: use-case orchestration and transaction boundaries
- `domain`: entities, enums, value objects, pure domain rules
- `infrastructure`: repositories and persistence adapters

The goal of Phase 1 is to standardize structure and rules before moving classes in Phase 2.

## Architecture Goals

- Keep code discoverable by feature instead of by technical layer.
- Reduce accidental coupling between unrelated features.
- Make ownership clear for controllers, services, entities, and repositories.
- Mirror source structure in tests.
- Keep behavior unchanged while reorganizing.

## Target Package Tree

```text
com.tecstorm.housematch
├── Application.java
├── config/
├── common/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── security/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── auth/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── profile/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── property/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── favorite/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── matching/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── personality/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── review/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
└── searchpreference/
    ├── api/
    ├── application/
    ├── domain/
    └── infrastructure/
```

## Layer Responsibilities

- `api`
  - Owns HTTP contracts: controllers, request DTOs, response DTOs.
  - No repository access.
  - Delegates to `application` services only.

- `application`
  - Owns use-case orchestration, transaction boundaries, and feature workflows.
  - Can call `domain` objects and feature `infrastructure` repositories.
  - Can call another feature's `application` service only when that dependency is explicit and unavoidable.

- `domain`
  - Owns business concepts: entities, enums, IDs, value mappings, pure computations.
  - No Spring web dependencies.

- `infrastructure`
  - Owns persistence details: Spring Data repositories and DB-facing adapters.
  - Never called directly from `api`.

## Dependency Rules

- Allowed directions:
  - `api -> application`
  - `application -> domain`
  - `application -> infrastructure` (same feature)
  - `infrastructure -> domain`

- Forbidden directions:
  - `api -> infrastructure`
  - `api -> repository`
  - `domain -> api`
  - cross-feature repository usage

## Naming and Packaging Conventions

- Package names are lowercase only.
- Keep suffixes consistent:
  - `*Controller` in `api`
  - `*Service` in `application`
  - `*Entity`, enums, IDs in `domain`
  - `*Repository` in `infrastructure`
- DTOs are feature-owned in `api/dto` (no global `dto/Bedroom` or `dto/Property`).
- Keep Java records for DTOs (existing project standard).

## Current Standards Compatibility

This structure preserves existing backend standards:

- Repositories remain accessible through services, not controllers.
- DTO-first API boundaries remain in place.
- Entity naming remains `{name}Entity`.

## Test Structure

Tests should mirror feature packages under `src/test/java/com/tecstorm/housematch`:

```text
auth/
profile/
property/
favorite/
matching/
personality/
review/
searchpreference/
common/
security/
```

For larger features, tests can mirror layer directories (`api`, `application`, `domain`, `infrastructure`).

## Rollout Plan

- Phase 1: create architecture docs, migration map, and package skeletons.
- Phase 2: move classes feature by feature without changing behavior.
- Phase 3: add architecture guardrails (for example ArchUnit rules) to prevent regressions.

## Phase 3 Guardrails

Architecture guardrails are enforced by ArchUnit tests in:

- `src/test/java/com/tecstorm/housematch/common/infrastructure/ArchitectureRulesTest.java`

Current enforced checks:

- `api` packages cannot depend on `infrastructure` packages.
- `*Repository` types cannot be used outside `application` and `infrastructure` packages.
- Legacy layer package roots (`controller`, `service`, `repository`, `entities`, `dto`, `integration`) are forbidden.
