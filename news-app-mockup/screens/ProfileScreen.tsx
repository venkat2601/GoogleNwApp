"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"
import TopicChip from "../components/TopicChip"

const ProfileScreen: React.FC = () => {
  const { user, updateUser } = useUser()
  const [name, setName] = useState(user.name)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    updateUser({ name })
    setIsEditing(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=68" }} style={styles.profileImage} />
          {isEditing ? (
            <View style={styles.editNameContainer}>
              <TextInput style={styles.nameInput} value={name} onChangeText={setName} autoFocus />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Ionicons name="pencil" size={16} color="#1a73e8" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.membershipContainer}>
            <Ionicons
              name={user.isPremium ? "star" : "star-outline"}
              size={16}
              color={user.isPremium ? "#1a73e8" : "#5f6368"}
            />
            <Text style={[styles.membershipText, { color: user.isPremium ? "#1a73e8" : "#5f6368" }]}>
              {user.isPremium ? "Premium Member" : "Basic Member"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Summary</Text>
          <Text style={styles.summaryText}>
            Based on your reading habits, you're most interested in Technology, Business, and Science news. You
            typically read news in the morning and evening, and prefer concise summaries over lengthy articles.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics of Interest</Text>
          <Text style={styles.sectionDescription}>These are the topics you follow. Tap to manage your interests.</Text>
          <View style={styles.topicsContainer}>
            {user.topicsOfInterest.map((topic) => (
              <TopicChip
                key={topic}
                topic={topic}
                selected
                highInterest={user.highInterestTopics.includes(topic)}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={20} color="#5f6368" />
          <Text style={styles.settingsText}>Account Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202124",
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  editNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  nameInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1a73e8",
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 150,
  },
  saveButton: {
    marginLeft: 8,
    backgroundColor: "#1a73e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  membershipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  membershipText: {
    marginLeft: 4,
    fontSize: 14,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#5f6368",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: "#5f6368",
    lineHeight: 20,
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#5f6368",
    fontWeight: "500",
  },
})

export default ProfileScreen
