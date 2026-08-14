import AppHeader from "@/components/AppHeader";
import { getTotalGrowthPoints } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from "react-native";

export default function RewardsScreen() {
  const [growthPoints, setGrowthPoints] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadGrowthPoints() {
        setIsLoading(true);

        const totalPoints =
          await getTotalGrowthPoints([
            "starter-7",
            "builder-30",
            "sprint-1000",
          ]);

        if (isActive) {
          setGrowthPoints(totalPoints);
          setIsLoading(false);
        }
      }

      loadGrowthPoints();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleShareInvite = async () => {
    try {
      await Share.share({
        message:
          "I'm building better money habits with BlinkMoney! 💚\n\n" +
          "Join me and start your own money mission.\n\n" +
          "Referral code: AXDI",
        title: "Join BlinkMoney",
      });
    } catch (error) {
      console.error("Failed to share invite:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading rewards...</Text>
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

      {/* Growth Points */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsIconCircle}>
          <Text style={styles.pointsIcon}>✦</Text>
        </View>

        <Text style={styles.pointsEyebrow}>
          YOUR GROWTH POINTS
        </Text>

        <Text style={styles.points}>
          {growthPoints}
        </Text>

        <Text style={styles.pointsLabel}>
          Growth Points
        </Text>

        <Text style={styles.pointsDescription}>
          Complete money missions and build consistent
          financial habits to earn more points.
        </Text>
      </View>

      {/* Referral */}
      <View style={styles.referralCard}>
        <View style={styles.giftCircle}>
          <Ionicons
            name="gift-outline"
            size={26}
            color="#2b551a"
          />
        </View>

        <Text style={styles.referralTitle}>
          Invite friends to BlinkMoney
        </Text>

        <Text style={styles.referralDescription}>
          Share your referral code and help them start investing
    or  unlock credit against mutual funds.
        </Text>

        <View style={styles.referralCodeBox}>
          <Text style={styles.referralCodeLabel}>
            Referral code
          </Text>

          <Text style={styles.referralCode}>
            AXDI
          </Text>
        </View>
      </View>

      {/* Share */}
      <Pressable
        style={styles.shareButton}
        onPress={handleShareInvite}
      >
        <Ionicons
          name="share-social-outline"
          size={22}
          color="#0b1407"
          style={styles.shareIcon}
        />

        <Text style={styles.shareButtonText}>
          Share invite
        </Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          Designed to help your savings grow regularly
        </Text>

        <Text style={styles.footerText}>
          AMFI registered Mutual Fund Distributor
        </Text>

        <Text style={styles.footerText}>
          Capline ventures private limited ARN: 330047
        </Text>

        <Text style={styles.certifiedText}>
          Certified to ISO/IEC 27001:2022
        </Text>

        <Text style={styles.madeInIndia}>
          🇮🇳 Made in India ❤️
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B07",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 160,
  },

  /* Loading */

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

  /* Growth Points */

  pointsCard: {
    backgroundColor: "#111811",
    borderRadius: 20,
    padding: 15,
    borderColor: "#263226",
    alignItems: "center",
    marginBottom: 20,
  },

  pointsIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#9BEA5A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  pointsIcon: {
    color: "#0B160B",
    fontSize: 25,
    fontWeight: "700",
  },

  pointsEyebrow: {
    color: "#9BEA5A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  points: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "500",
  },

  pointsLabel: {
    color: "#9BEA5A",
    fontSize: 14,
    fontWeight: "600",
  },

  pointsDescription: {
    color: "#A8ADA8",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 5,
  },

  /* Referral */

  referralCard: {
    width: "100%",
    backgroundColor: "#162016",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#263526",
    marginBottom: 0,
  },

  giftCircle: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#9BEA5A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  giftIcon: {
    fontSize: 30,
  },

  referralTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  referralDescription: {
    color: "#A8ADA8",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 580,
  },

  referralCodeBox: {
    width: "100%",
    height: 70,
    backgroundColor: "#070B07",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 15,
  },

  referralCodeLabel: {
    color: "#A8ADA8",
    fontSize: 11,
  },

  referralCode: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  /* Share */

  shareButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#9BEA5A",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 20,
  },

  shareIcon: {
    position: "absolute",
    left: 24,
    color: "#1c3810",
  },

  shareButtonText: {
    color: "#315F1D",
    fontSize: 14,
    fontWeight: "700",
    
  },

  /* Footer */

  footer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  footerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  footerText: {
    color: "#c6d1c7",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 3
  },

  certifiedText: {
    color: "#c6d1c7",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },

  madeInIndia: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 5,
  },
});