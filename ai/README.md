# Demo: Roommate Matching with MariaDB (Java)

This demo uses a mock roommate dataset and MariaDB vector search to find the best profile matches.

## Matching characteristics

- cleanliness (1-5)
- noise level (1-5)
- guest frequency (1-5)
- daily schedule (`EARLY_BIRD`, `BALANCED`, `NIGHT_OWL`)
- social interactions (`LOW`, `MEDIUM`, `HIGH`)

## Setup

1. Start MariaDB:

```shell
docker compose up -d
```

2. Check MariaDB status:

```shell
docker logs mariadb
```

## Compute profile embeddings

Generate vectors for all mock profiles:

```shell
./ComputeVectors.java
```

## Run matching search

Search for compatible roommates by entering the same five parameters:

```shell
./ChatDemo.java
```
