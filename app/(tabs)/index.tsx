import AppHeader from "@/components/AppHeader";
import { missions } from "@/data/missions";
import { useMissionProgress } from "@/hooks/useMissionProgress";
import { useRouter } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

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

  const handleHelp = async () => {
    const message =
      "Hi BlinkMoney Support!\nI need help in BlinkMoney chat";

    const whatsappUrl =
      `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.error(
        "Unable to open WhatsApp:",
        error
      );
    }
  };

  if (isLoading || !activeMission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading...
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
      {/* Header */}
      <AppHeader />

      {/* Main Mission Card */}
      <View style={styles.missionCard}>
        <View style={styles.missionTopRow}>
          <View>
            <Text style={styles.eyebrow}>YOUR ACTIVE MISSION</Text>

            <Text style={styles.missionTitle}>
              7-Day Starter
            </Text>
          </View>

          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>
              {missionProgress.completedDays} days
            </Text>
          </View>
        </View>

        <Text style={styles.missionDescription}>
          Save ₹21 every day and build your investing habit.
        </Text>

        {/* Progress */}
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Your progress</Text>
          <Text style={styles.progressValue}>
            {missionProgress.completedDays} / {activeMission.totalDays}
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progress,
              {
                width: `${
                  (missionProgress.completedDays /
                    activeMission.totalDays) *
                  100
                }%`,
              },
            ]}
          />
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.amount}>
            ₹{activeMission.dailyAmount *
              missionProgress.completedDays}{" "} 
            saved
          </Text>
          <Text style={styles.target}>
            Target ₹{activeMission.dailyAmount * activeMission.totalDays}
          </Text>
        </View>

        <Pressable 
          style={styles.primaryButton}
          onPress={() =>
            router.push(`/mission/${activeMission.id}`)
          }
        >
          <Text style={styles.primaryButtonText}>
            {missionProgress.completedDays >= activeMission.totalDays
              ? "View Completed Mission"
              : "Continue Mission"}
          </Text>
        </Pressable>
      </View>

      {/* Today's Progress */}
      <Text style={styles.sectionTitle}>Today's progress</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>

          <Text style={styles.statValue}>
            {missionProgress.completedDays}
          </Text>

          <Text style={styles.statLabel}>Day streak</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>✦</Text>

          <Text style={styles.statValue}>
            {missionProgress.growthPoints}
          </Text>

          <Text style={styles.statLabel}>Growth points</Text>
        </View>
      </View>

      {/* Today's Mission */}
      <View style={styles.todayCard}>
        <View style={styles.todayHeader}>
          <View>
            <Text style={styles.eyebrow}>TODAY</Text>

            <Text style={styles.todayTitle}>
                {missionProgress.completedDays >= activeMission.totalDays
                  ? "Mission completed 🎉"
                  : "Complete today's mission"}
            </Text>
          </View>

          <View style={styles.checkCircle}>
            <Text style={styles.check}>
              {missionProgress.completedDays >= activeMission.totalDays
                ? "✓"
                : "!"}
            </Text>
          </View>
        </View>

        <Text style={styles.todayDescription}>
           {missionProgress.completedDays >= activeMission.totalDays
              ? `You've completed all ${activeMission.totalDays} days and earned ${missionProgress.growthPoints} Growth Points.`
              : `Complete today's ₹${activeMission.dailyAmount} contribution to keep your streak alive.`}
        </Text>

        <Pressable 
          style={styles.secondaryButton}
          onPress={() =>
            router.push(`/mission/${activeMission.id}`)
          }
        >
          <Text style={styles.secondaryButtonText}>
            {missionProgress.completedDays >= activeMission.totalDays
              ? "View Mission"
              : "Complete Today's Mission"}
          </Text>
        </Pressable>
      </View>

      {/* Quick Action */}
      <View style={styles.discoveryCard}>
        <Text style={styles.discoveryEmoji}>🚀</Text>

        <View style={styles.discoveryContent}>
          <Text style={styles.discoveryTitle}>
            Want a bigger challenge?
          </Text>

          <Text style={styles.discoveryDescription}>
            Explore missions designed to help you build
            better money habits.
          </Text>

          <Pressable 
            style={styles.discoveryButton}
            onPress={() =>
              router.push("/missions")
            }
          >
            <Text style={styles.discoveryLink}>
              Explore missions →
            </Text>
          </Pressable>
        </View>
      </View>
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
    paddingBottom: 120,
  },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9BEA5A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  welcome: {
    color: "#8D958E",
    fontSize: 14,
    marginTop: 2,
  },

  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9BEA5A",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  helpText: {
    color: "#0B160B",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },

  /* Mission */

  missionCard: {
    backgroundColor: "#111811",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#202A20",
    marginBottom: 28,
  },

  missionTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  eyebrow: {
    color: "#9BEA5A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  missionTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 8,
  },

  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192519",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  streakIcon: {
    fontSize: 14,
    marginRight: 4,
  },

  streakText: {
    color: "#9BEA5A",
    fontSize: 12,
    fontWeight: "700",
  },

  missionDescription: {
    color: "#A8ADA8",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 24,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressLabel: {
    color: "#A8ADA8",
    fontSize: 12,
  },

  progressValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#273326",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#9BEA5A",
    borderRadius: 10,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  target: {
    color: "#7D867E",
    fontSize: 12,
  },

  primaryButton: {
    backgroundColor: "#9BEA5A",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#0B160B",
    fontSize: 15,
    fontWeight: "700",
  },

  /* Stats */

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#111811",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#202A20",
  },

  statIcon: {
    fontSize: 20,
    marginBottom: 12,
  },

  statValue: {
    color: "#9BEA5A",
    fontSize: 28,
    fontWeight: "700",
  },

  statLabel: {
    color: "#8D958E",
    fontSize: 12,
    marginTop: 4,
  },

  /* Today's mission */

  todayCard: {
    backgroundColor: "#162016",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#263526",
  },

  todayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  todayTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 7,
  },

  checkCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#9BEA5A",
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    color: "#0B160B",
    fontSize: 20,
    fontWeight: "800",
  },

  todayDescription: {
    color: "#A8ADA8",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#9BEA5A",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 18,
  },

  secondaryButtonText: {
    color: "#9BEA5A",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Discovery */

  discoveryCard: {
    flexDirection: "row",
    backgroundColor: "#0F150F",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#202A20",
  },

  discoveryEmoji: {
    fontSize: 30,
    marginRight: 14,
  },

  discoveryContent: {
    flex: 1,
  },

  discoveryTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  discoveryDescription: {
    color: "#8D958E",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 10,
  },

  discoveryButton: {
    alignSelf: "flex-start",
    marginTop: 2,
  },

  discoveryLink: {
    color: "#9BEA5A",
    fontSize: 13,
    fontWeight: "700",
  },
});