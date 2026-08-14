import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function AppHeader() {
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

  return (
    <View style={styles.header}>
      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.avatarOuter}>
          <View style={styles.avatarInner}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#4B8F2A"
            />
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello Pooja</Text>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>
      </View>

      {/* Help */}
      <Pressable
        style={styles.helpButton}
        onPress={handleHelp}
      >
        <Ionicons
          name="logo-whatsapp"
          size={18}
          color="#315F1D"
        />

        <Text style={styles.helpText}>Help</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarOuter: {
    width: 40,
    height: 40,
    borderRadius: 32,
    backgroundColor: "#9FE870",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarInner: {
    width: 32,
    height: 32,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#4B8F2A",
    backgroundColor: "#9FE870",
    alignItems: "center",
    justifyContent: "center",
  },

  userInfo: {
    marginLeft: 8,
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },

  welcome: {
    color: "#a5afa6",
    fontSize: 10,
  },

  helpButton: {
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 24,
    backgroundColor: "#9FE870",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  helpText: {
    color: "#315F1D",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },
});