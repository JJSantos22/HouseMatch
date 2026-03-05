///usr/bin/env ./jbang-wrapper/jbang --quiet "$0" "$@" ; exit $?

//DEPS org.mariadb.jdbc:mariadb-java-client:3.5.0
//DEPS org.sql2o:sql2o:1.8.0
//DEPS org.slf4j:slf4j-simple:2.0.16

import org.sql2o.*;
import org.sql2o.data.*;
import java.util.Locale;

public class ComputeVectors {

	public static void main(String[] args) throws Exception {
		try (var connection = new Sql2o(
				"jdbc:mariadb://127.0.0.1:3306/demo", "root", "password").open()) {

			var table = connection.createQuery("""
					SELECT id, cleanliness, noise_level, guest_frequency, daily_schedule, social_interaction
					FROM roommate_profiles
					WHERE embedding IS NULL
					""").executeAndFetchTableLazy();

			for (Row row : table.rows()) {
				var id = row.getLong("id");
				var cleanliness = row.getInteger("cleanliness");
				var noiseLevel = row.getInteger("noise_level");
				var guestFrequency = row.getInteger("guest_frequency");
				var dailySchedule = row.getString("daily_schedule");
				var socialInteraction = row.getString("social_interaction");

				var embedding = buildEmbedding(
						cleanliness,
						noiseLevel,
						guestFrequency,
						dailySchedule,
						socialInteraction);

				connection.createQuery("""
						UPDATE roommate_profiles
						SET embedding = VEC_FromText(:embedding)
						WHERE id = :id
						""")
						.addParameter("embedding", embedding)
						.addParameter("id", id)
						.executeUpdate();

				System.out.println("Updated embedding for profile ID: " + id);
			}
		}

		System.out.println("All embeddings updated!");
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
