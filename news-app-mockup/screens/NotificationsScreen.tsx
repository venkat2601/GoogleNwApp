"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"

const NotificationsScreen: React.FC = () => {
  const { user, addHighInterestTopic, removeHighInterestTopic } = useUser()
  const [pushEnabled, setPushEnabled] = useState(true)
  const [breakingNewsEnabled, setBreakingNewsEnabled] = useState(true)
  const [dailyDigestEnabled, setDailyDigestEnabled] = useState(true)

  const toggleHighInterestTopic = (topic: string) => {
    if (user.highInterestTopics.includes(topic)) {
      removeHighInterestTopic(topic)
    } else {
      addHighInterestTopic(topic)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notification Settings</Text>
        <Text style={styles.subtitle}>Customize which notifications you receive and when</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Enable or disable all push notifications</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: "#e0e0e0", true: "#c2d7f8" }}
            thumbColor={pushEnabled ? "#1a73e8" : "#f4f3f4"}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Breaking News</Text>
            <Text style={styles.settingDescription}>Get notified about major breaking news stories</Text>
          </View>
          <Switch
            value={breakingNewsEnabled && pushEnabled}
            onValueChange={setBreakingNewsEnabled}
            disabled={!pushEnabled}
            trackColor={{ false: "#e0e0e0", true: "#c2d7f8" }}
            thumbColor={breakingNewsEnabled && pushEnabled ? "#1a73e8" : "#f4f3f4"}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Daily Digest</Text>
            <Text style={styles.settingDescription}>Receive a daily summary of top stories at 8 AM</Text>
          </View>
          <Switch
            value={dailyDigestEnabled && pushEnabled}
            onValueChange={setDailyDigestEnabled}
            disabled={!pushEnabled}
            trackColor={{ false: "#e0e0e0", true: "#c2d7f8" }}
            thumbColor={dailyDigestEnabled && pushEnabled ? "#1a73e8" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.topicsSection}>
        <Text style={styles.topicsSectionTitle}>High Interest Topics</Text>
        <Text style={styles.topicsSectionDescription}>
          You'll receive notifications for these topics. Tap to toggle.
        </Text>

        <FlatList
          data={user.topicsOfInterest}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.topicItem, user.highInterestTopics.includes(item) && styles.topicItemSelected]}
              onPress={() => toggleHighInterestTopic(item)}
              disabled={!pushEnabled}
            >
              <Text style={[styles.topicText, user.highInterestTopics.includes(item) && styles.topicTextSelected]}>
                {item}
              </Text>
              {user.highInterestTopics.includes(item) && <Ionicons name="notifications" size={20} color="#fff" />}
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={styles.topicsGrid}
        />
      </View>

      <View style={styles.mlSection}>
        <View style={styles.mlHeader}>
          <Ionicons name="analytics" size={24} color="#1a73e8" />
          <Text style={styles.mlTitle}>Machine Learning Personalization</Text>
        </View>
        <Text style={styles.mlDescription}>
          Our AI analyzes your reading habits to better understand your interests and provide more relevant content and
          notifications.
        </Text>
        <View style={styles.mlFeatures}>
          <View style={styles.mlFeatureItem}>
            <Ionicons name="time-outline" size={20} color="#5f6368" />
            <Text style={styles.mlFeatureText}>Reading time analysis</Text>
          </View>
          <View style={styles.mlFeatureItem}>
            <Ionicons name="heart-outline" size={20} color="#5f6368" />
            <Text style={styles.mlFeatureText}>Interest pattern detection</Text>
          </View>
          <View style={styles.mlFeatureItem}>
            <Ionicons name="trending-up-outline" size={20} color="#5f6368" />
            <Text style={styles.mlFeatureText}>Topic relevance scoring</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#5f6368",
  },
  section: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#202124",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#5f6368",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  topicsSection: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topicsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 4,
  },
  topicsSectionDescription: {
    fontSize: 14,
    color: "#5f6368",
    marginBottom: 16,
  },
  topicsGrid: {
    paddingTop: 8,
  },
  topicItem: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f3f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicItemSelected: {
    backgroundColor: "#1a73e8",
  },
  topicText: {
    fontSize: 14,
    color: "#5f6368",
    fontWeight: "500",
  },
  topicTextSelected: {
    color: "#fff",
  },
  mlSection: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mlHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  mlTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
    marginLeft: 8,
  },
  mlDescription: {
    fontSize: 14,
    color: "#5f6368",
    lineHeight: 20,
    marginBottom: 16,
  },
  mlFeatures: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
  },
  mlFeatureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  mlFeatureText: {
    fontSize: 14,
    color: "#5f6368",
    marginLeft: 8,
  },
})

export default NotificationsScreen
