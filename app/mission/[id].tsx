import { useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useLocalSearchParams, useRouter } from "expo-router";

import { missions } from "@/data/missions";
import { useMissionProgress } from "@/hooks/useMissionProgress";

export default function MissionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  
  const missionId = Array.isArray(id) ? id[0] : id;

  const mission = missions.find(
    (item) => item.id === missionId
  );

  const {
    progress: missionProgress,
    isLoading,
    completeDay,
  } = useMissionProgress(missionId, mission?.totalDays ?? 0);

  // const progress =
  //   missionProgress.completedDays / mission.totalDays;
  const progress = mission
  ? missionProgress.completedDays / mission.totalDays
  : 0;

  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 600,
    });
  }, [progress, animatedProgress]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  const handleShareAchievement = async () => {
    try {
        await Share.share({
        message:
            `🎉 I completed the ${mission?.title} mission on BlinkMoney!\n\n` +
            `💰 ₹${savedAmount} saved\n` +
            `🔥 ${currentStreak} day streak\n` +
            `✦ ${missionProgress.growthPoints} Growth Points\n\n` +
            `I'm building better money habits with BlinkMoney! 💚`,
        title: "BlinkMoney Achievement",
        });
    } catch (error) {
        console.error(
        "Failed to share achievement:",
        error
        );
    }
  };

  if (isLoading) {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>
                Loading mission...
            </Text>
        </View>
    );
  }

  if (!mission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Mission not found
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const savedAmount =
    mission.dailyAmount * missionProgress.completedDays;

  const targetAmount =
    mission.dailyAmount * mission.totalDays;

  const currentStreak = missionProgress.completedDays;

  const isMissionCompleted =
    missionProgress.completedDays >= mission.totalDays;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>‹</Text>

        <Text style={styles.backLabel}>
          Missions
        </Text>
      </Pressable>

      {/* Hero */}

      <View style={styles.hero}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {mission.icon}
          </Text>
        </View>

        <Text style={styles.eyebrow}>
          MONEY MISSION
        </Text>

        <Text style={styles.title}>
          {mission.title}
        </Text>

        <Text style={styles.description}>
          {mission.description}
        </Text>
      </View>

      {/* Progress */}

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            Your progress
          </Text>

          <Text style={styles.progressValue}>
            {missionProgress.completedDays} / {mission.totalDays} days
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progress,
              animatedProgressStyle,
            ]}
          />
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>
              Saved
            </Text>

            <Text style={styles.amountValue}>
              ₹{savedAmount}
            </Text>
          </View>

          <View style={styles.amountRight}>
            <Text style={styles.amountLabel}>
              Target
            </Text>

            <Text style={styles.amountValue}>
              ₹{targetAmount}
            </Text>
          </View>
        </View>
      </View>

      {/* Mission details */}

      <Text style={styles.sectionTitle}>
        Mission details
      </Text>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Daily contribution
          </Text>

          <Text style={styles.detailValue}>
            ₹{mission.dailyAmount}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Duration
          </Text>

          <Text style={styles.detailValue}>
            {mission.totalDays} days
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Growth points
          </Text>

          <Text style={styles.rewardValue}>
            +{mission.rewardPoints}
          </Text>
        </View>
      </View>

      {/* Streak */}

        <View style={styles.statsRow}>
            <View style={styles.statCard}>
                <Text style={styles.statIcon}>🔥</Text>

                <Text style={styles.statValue}>
                {currentStreak}
                </Text>

                <Text style={styles.statLabel}>
                Day streak
                </Text>
            </View>

            <View style={styles.statCard}>
                <Text style={styles.statIcon}>✦</Text>

                <Text style={styles.statValue}>
                {missionProgress.growthPoints}
                </Text>

                <Text style={styles.statLabel}>
                Growth points
                </Text>
            </View>
        </View>

      {/* CTA */}

      {/* CTA / Completion */}

{isMissionCompleted ? (
  <View style={styles.completionCard}>
    <Text style={styles.completionEmoji}>
      🎉
    </Text>

    <Text style={styles.completionTitle}>
      Mission Complete!
    </Text>

    <Text style={styles.completionMission}>
      {mission.title}
    </Text>

    <View style={styles.completionStats}>
      <View style={styles.completionStat}>
        <Text style={styles.completionStatValue}>
          ₹{savedAmount}
        </Text>

        <Text style={styles.completionStatLabel}>
          saved
        </Text>
      </View>

      <View style={styles.completionDivider} />

      <View style={styles.completionStat}>
        <Text style={styles.completionStatValue}>
          🔥 {currentStreak}
        </Text>

        <Text style={styles.completionStatLabel}>
          day streak
        </Text>
      </View>

      <View style={styles.completionDivider} />

      <View style={styles.completionStat}>
        <Text style={styles.completionStatValue}>
          ✦ {missionProgress.growthPoints}
        </Text>

        <Text style={styles.completionStatLabel}>
          points
        </Text>
      </View>
    </View>

    <Pressable
      style={styles.shareAchievementButton}
      onPress={handleShareAchievement}
    >
      <Text style={styles.shareAchievementText}>
        Share Achievement
      </Text>
    </Pressable>

    <Pressable
      style={styles.backToMissionsButton}
      onPress={() => router.back()}
    >
      <Text style={styles.backToMissionsText}>
        Back to Missions
      </Text>
    </Pressable>
  </View>
) : (
  <Pressable
    style={styles.button}
    onPress={completeDay}
  >
    <Text style={styles.buttonText}>
      Complete Today's Mission
    </Text>
  </Pressable>
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#070B07",
    },

    content: {
        paddingHorizontal: 24,
        paddingTop: 55,
        paddingBottom: 100,
    },

    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },

    backText: {
        color: "#9FE870",
        fontSize: 32,
        lineHeight: 32,
    },

    backLabel: {
        color: "#B8BDB8",
        fontSize: 14,
        marginLeft: 6,
    },

    hero: {
        alignItems: "center",
    },

    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: "#1B281A",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    icon: {
        fontSize: 34,
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
        fontWeight: "700",
        marginTop: 8,
        textAlign: "center",
    },

    description: {
        color: "#8D958E",
        fontSize: 15,
        lineHeight: 22,
        textAlign: "center",
        marginTop: 12,
    },

    progressCard: {
        backgroundColor: "#111811",
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "#202A20",
        marginTop: 30,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    progressLabel: {
        color: "#8D958E",
        fontSize: 13,
    },

    progressValue: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    progressBackground: {
        height: 10,
        backgroundColor: "#273326",
        borderRadius: 10,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        backgroundColor: "#9FE870",
        borderRadius: 10,
    },

    amountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
    },

    amountRight: {
        alignItems: "flex-end",
    },

    amountLabel: {
        color: "#737B74",
        fontSize: 11,
    },

    amountValue: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 3,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 30,
        marginBottom: 14,
    },

    detailsCard: {
        backgroundColor: "#111811",
        borderRadius: 22,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: "#202A20",
    },

    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 17,
    },

    detailLabel: {
        color: "#8D958E",
        fontSize: 13,
    },

    detailValue: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    rewardValue: {
        color: "#9FE870",
        fontSize: 14,
        fontWeight: "700",
    },

    divider: {
        height: 1,
        backgroundColor: "#202A20",
    },

    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 18,
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
        marginBottom: 10,
        color: "#a9d257",
    },

    statValue: {
        color: "#9FE870",
        fontSize: 28,
        fontWeight: "700",
    },

    statLabel: {
        color: "#8D958E",
        fontSize: 12,
        marginTop: 4,
    },


    button: {
        backgroundColor: "#9FE870",
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 17,
        marginTop: 24,
    },

    buttonText: {
        color: "#080C08",
        fontSize: 15,
        fontWeight: "700",
    },

    completionCard: {
        backgroundColor: "#162016",
        borderRadius: 28,
        padding: 24,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#334A33",
        alignItems: "center",
    },

    completionEmoji: {
        fontSize: 42,
        marginBottom: 10,
    },

    completionTitle: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
    },

    completionMission: {
        color: "#9FE870",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 6,
    },

    completionStats: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 26,
        paddingVertical: 18,
        paddingHorizontal: 4,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#263526",
    },

    completionStat: {
        flex: 1,
        alignItems: "center",
    },

    completionStatValue: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },

    completionStatLabel: {
        color: "#8D958E",
        fontSize: 11,
        marginTop: 5,
    },

    completionDivider: {
        width: 1,
        height: 35,
        backgroundColor: "#263526",
    },

    shareAchievementButton: {
        width: "100%",
        backgroundColor: "#9FE870",
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 16,
        marginTop: 22,
    },

    shareAchievementText: {
        color: "#080C08",
        fontSize: 15,
        fontWeight: "700",
    },

    backToMissionsButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#9FE870",
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 15,
        marginTop: 10,
    },

    backToMissionsText: {
        color: "#9FE870",
        fontSize: 14,
        fontWeight: "700",
    },

    errorContainer: {
        flex: 1,
        backgroundColor: "#070B07",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    errorTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
    },
});