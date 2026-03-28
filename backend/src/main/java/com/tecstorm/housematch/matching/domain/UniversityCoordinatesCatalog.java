package com.tecstorm.housematch.matching.domain;

import java.text.Normalizer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

public final class UniversityCoordinatesCatalog {

    private static final Map<String, Coordinates> LOOKUP = buildLookup();

    private UniversityCoordinatesCatalog() {}

    public static Optional<Coordinates> findCoordinates(String universityName) {
        if (universityName == null || universityName.isBlank()) {
            return Optional.empty();
        }
        return Optional.ofNullable(LOOKUP.get(normalize(universityName)));
    }

    public record Coordinates(double lat, double lng) {}

    private static Map<String, Coordinates> buildLookup() {
        Map<String, Coordinates> map = new HashMap<>();

        Coordinates ulisboa = new Coordinates(38.4407d, -9.0812d);
        addAliases(map, ulisboa,
            "Instituto Superior Técnico",
            "IST",
            "Instituto Superior Técnico - ULisboa"
        );

        Coordinates ipLisboa = new Coordinates(38.756513, -9.116641);
        addAliases(map, ipLisboa,
            "Politécnico de Lisboa",
            "Instituto Politécnico de Lisboa",
            "Polytechnic University of Lisbon",
            "Politecnico de Lisboa"
        );

        Coordinates iscteLisboa = new Coordinates(38.7487d, -9.1537d);
        addAliases(map, iscteLisboa,
            "ISCTE - Instituto Universitário de Lisboa",
            "Instituto Universitário de Lisboa",
            "ISCTE",
            "ISCTE-IUL"
        );

        Coordinates feupPorto = new Coordinates(41.1778d, -8.3554d);
        addAliases(map, feupPorto,
            "Faculdade de Engenharia da Universidade do Porto",
            "Faculty of Engineering of the University of Porto",
            "FEUP"
        );

        return Map.copyOf(map);
    }

    private static void addAliases(Map<String, Coordinates> map, Coordinates coordinates, String... aliases) {
        for (String alias : aliases) {
            map.put(normalize(alias), coordinates);
        }
    }

    private static String normalize(String value) {
        String noDiacritics = Normalizer.normalize(value, Normalizer.Form.NFD)
            .replaceAll("\\p{M}+", "");
        return noDiacritics.trim().toLowerCase(Locale.ROOT);
    }
}
