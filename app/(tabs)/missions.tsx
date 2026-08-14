import MissionCard from "@/components/MissionCard";
import { missions } from "@/data/missions";
import { useMissionProgress } from "@/hooks/useMissionProgress";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MissionsScreen() {
  const activeMission = missions.find(
    (mission) => mission.status === "active"
  );

  const {
    progress: missionProgress,
    isLoading,
  } = useMissionProgress(
    activeMission?.id ?? "",
    activeMission?.totalDays ?? 0
  );

  const activeMissionWithProgress = activeMission
    ? {
        ...activeMission,
        completedDays: missionProgress.completedDays,
      }
    : null;

  const availableMissions = missions.filter(
    (mission) => mission.status === "available"
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading missions...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>
        MONEY MISSIONS
      </Text>

      <Text style={styles.title}>
        Build your wealth,
        {"\n"}
        one small win at a time.
      </Text>

      <Text style={styles.description}>
        Complete simple challenges, build consistency and
        earn rewards.
      </Text>

      {activeMission && (
        <>
          <Text style={styles.sectionTitle}>
            Active
          </Text>

          {activeMissionWithProgress && (
            <MissionCard
              mission={activeMissionWithProgress}
              variant="active"
            />
          )}
        </>
      )}

      <Text style={styles.sectionTitle}>
        Available
      </Text>

      {availableMissions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          variant="available"
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#070B07",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#8D958E",
    fontSize: 14,
  },

  container: {
    flex: 1,
    backgroundColor: "#070B07",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 110,
  },

  eyebrow: {
    color: "#9FE870",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "700",
    marginTop: 12,
  },

  description: {
    color: "#8D958E",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 14,
  },
});