import { StyleSheet, Text, View } from "react-native";

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>YOUR REWARDS</Text>

      <Text style={styles.title}>Keep going. 🔥</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>GROWTH POINTS</Text>

        <Text style={styles.points}>0</Text>

        <Text style={styles.cardDescription}>
          Complete missions to earn points and unlock achievements.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B07",
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  eyebrow: {
    color: "#9BEA5A",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#111811",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#263226",
  },

  cardLabel: {
    color: "#A8ADA8",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },

  points: {
    color: "#9BEA5A",
    fontSize: 48,
    fontWeight: "700",
    marginTop: 8,
  },

  cardDescription: {
    color: "#A8ADA8",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
});