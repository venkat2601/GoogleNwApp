"use client"

import type React from "react"
import { View, Text, Switch, StyleSheet } from "react-native"
import Icon from "./Icon"
import { useUser } from "../context/UserContext"

const PremiumToggle: React.FC = () => {
  const { user, togglePremium } = useUser()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Icon name="star" size={20} color={user.isPremium ? "#1a73e8" : "#5f6368"} />
          <Text style={styles.title}>Premium View</Text>
        </View>
        <Text style={styles.description}>
          {user.isPremium
            ? "Viewing 120-word AI summaries with full story links"
            : "Switch to 120-word AI summaries with full story links"}
        </Text>
      </View>
      <Switch
        trackColor={{ false: "#e0e0e0", true: "#c2d7f8" }}
        thumbColor={user.isPremium ? "#1a73e8" : "#f4f3f4"}
        ios_backgroundColor="#e0e0e0"
        onValueChange={togglePremium}
        value={user.isPremium}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#202124",
  },
  description: {
    fontSize: 14,
    color: "#5f6368",
  },
})

export default PremiumToggle
