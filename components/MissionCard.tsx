import { Pressable, StyleSheet, Text, View } from "react-native";

import { Mission } from "@/types/mission";
import { useRouter } from "expo-router";

type MissionCardProps = {
  mission: Mission;
  variant?: "active" | "available";
};

export default function MissionCard({
  mission,
  variant = "available",
}: MissionCardProps) {
  const router = useRouter();

  const progress =
    mission.completedDays / mission.totalDays;

  const savedAmount =
    mission.dailyAmount * mission.completedDays;

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => router.push(`/mission/${mission.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{mission.icon}</Text>
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>
            {mission.title}
          </Text>

          <Text style={styles.cardDescription}>
            {mission.description}
          </Text>
        </View>
      </View>

      {variant === "active" ? (
        <>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Progress
            </Text>

            <Text style={styles.progressValue}>
              {mission.completedDays} / {mission.totalDays}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                {
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.amount}>
              ₹{savedAmount} saved
            </Text>

            <Text style={styles.reward}>
              +{mission.rewardPoints} pts
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.detailLabel}>
              Daily
            </Text>

            <Text style={styles.detailValue}>
              ₹{mission.dailyAmount}
            </Text>
          </View>

          <View>
            <Text style={styles.detailLabel}>
              Duration
            </Text>

            <Text style={styles.detailValue}>
              {mission.totalDays} days
            </Text>
          </View>

          <View>
            <Text style={styles.detailLabel}>
              Reward
            </Text>

            <Text style={styles.detailValue}>
              +{mission.rewardPoints}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111811",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#202A20",
    marginBottom: 14,
  },

  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#1B281A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 23,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  cardDescription: {
    color: "#8D958E",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 8,
  },

  progressLabel: {
    color: "#8D958E",
    fontSize: 12,
  },

  progressValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#273326",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#9FE870",
    borderRadius: 10,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  reward: {
    color: "#9FE870",
    fontSize: 13,
    fontWeight: "700",
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#202A20",
  },

  detailLabel: {
    color: "#737B74",
    fontSize: 11,
    marginBottom: 4,
  },

  detailValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});