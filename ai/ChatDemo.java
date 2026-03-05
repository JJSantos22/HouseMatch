///usr/bin/env ./jbang-wrapper/jbang --quiet "$0" "$@" ; exit $?

//DEPS org.mariadb.jdbc:mariadb-java-client:3.5.0
//DEPS org.sql2o:sql2o:1.8.0
//DEPS org.slf4j:slf4j-simple:2.0.16

import org.sql2o.*;
import java.util.Locale;

public class ChatDemo {

	public static void main(String[] args) {
		var console = System.console();
		if (console == null) {
			throw new IllegalStateException("Console is not available.");
		}

		var cleanliness = readScale(console, "Cleanliness (1-5): ");
		var noiseLevel = readScale(console, "Noise level (1-5): ");
		var guestFrequency = readScale(console, "Guest frequency (1-5): ");
		var dailySchedule = readDailySchedule(console);
		var socialInteraction = readSocialInteraction(console);
		var searchEmbedding = buildEmbedding(
				cleanliness,
				noiseLevel,
				guestFrequency,
				dailySchedule,
				socialInteraction);

		System.out.println("\nTop roommate matches:\n");
		searchMatches(searchEmbedding);
	}

	private static void searchMatches(String searchEmbedding) {
		try (var connection = new Sql2o(
				"jdbc:mariadb://127.0.0.1:3306/demo", "root", "password").open()) {

			var table = connection.createQuery("""
					SELECT
						profile_name,
						cleanliness,
						noise_level,
						guest_frequency,
						daily_schedule,
						social_interaction,
						notes,
						VEC_DISTANCE_COSINE(embedding, VEC_FromText(:search_embedding)) AS distance
					FROM roommate_profiles
					WHERE embedding IS NOT NULL
					ORDER BY distance
					LIMIT 5
					""")
					.addParameter("search_embedding", searchEmbedding)
					.executeAndFetchTable();

			var position = 1;
			for (var row : table.rows()) {
				System.out.printf(
						"%d. %s | distance=%.4f | cleanliness=%d noise=%d guests=%d schedule=%s social=%s%n   %s%n%n",
						position++,
						row.getString("profile_name"),
						row.getDouble("distance"),
						row.getInteger("cleanliness"),
						row.getInteger("noise_level"),
						row.getInteger("guest_frequency"),
						row.getString("daily_schedule"),
						row.getString("social_interaction"),
						row.getString("notes"));
			}
		}
	}

	private static String buildEmbedding(
			int cleanliness,
			int noiseLevel,
			int guestFrequency,
			String dailySchedule,
			String socialInteraction) {
		var cleanlinessValue = normalizeScale5(cleanliness);
		var noiseLevelValue = normalizeScale5(noiseLevel);
		var guestFrequencyValue = normalizeScale5(guestFrequency);
		var dailyScheduleValue = mapDailySchedule(dailySchedule);
		var socialInteractionValue = mapSocialInteraction(socialInteraction);

		return String.format(Locale.US, "[%.4f, %.4f, %.4f, %.4f, %.4f]",
				cleanlinessValue,
				noiseLevelValue,
				guestFrequencyValue,
				dailyScheduleValue,
				socialInteractionValue);
	}

	private static int readScale(java.io.Console console, String prompt) {
		while (true) {
			var value = console.readLine(prompt);
			try {
				var parsed = Integer.parseInt(value.trim());
				if (parsed >= 1 && parsed <= 5) {
					return parsed;
				}
			} catch (NumberFormatException ignored) {
				// Keep asking until valid.
			}
			System.out.println("Please provide a number from 1 to 5.");
		}
	}

	private static String readDailySchedule(java.io.Console console) {
		while (true) {
			var value = console.readLine("Daily schedule (EARLY_BIRD, BALANCED, NIGHT_OWL): ");
			var normalized = value.trim().toUpperCase();
			if (normalized.equals("EARLY_BIRD") || normalized.equals("BALANCED") || normalized.equals("NIGHT_OWL")) {
				return normalized;
			}
			System.out.println("Please choose EARLY_BIRD, BALANCED, or NIGHT_OWL.");
		}
	}

	private static String readSocialInteraction(java.io.Console console) {
		while (true) {
			var value = console.readLine("Social interaction (LOW, MEDIUM, HIGH): ");
			var normalized = value.trim().toUpperCase();
			if (normalized.equals("LOW") || normalized.equals("MEDIUM") || normalized.equals("HIGH")) {
				return normalized;
			}
			System.out.println("Please choose LOW, MEDIUM, or HIGH.");
		}
	}

	private static double normalizeScale5(int value) {
		return (value - 1) / 4.0;
	}

	private static double mapDailySchedule(String dailySchedule) {
		return switch (dailySchedule) {
			case "EARLY_BIRD" -> 0.0;
			case "BALANCED" -> 0.5;
			case "NIGHT_OWL" -> 1.0;
			default -> throw new IllegalArgumentException("Unknown daily_schedule: " + dailySchedule);
		};
	}

	private static double mapSocialInteraction(String socialInteraction) {
		return switch (socialInteraction) {
			case "LOW" -> 0.0;
			case "MEDIUM" -> 0.5;
			case "HIGH" -> 1.0;
			default -> throw new IllegalArgumentException("Unknown social_interaction: " + socialInteraction);
		};
	}
}
