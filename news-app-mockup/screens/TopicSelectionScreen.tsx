"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"
import TopicChip from "../components/TopicChip"

// Google News-like topics
const allTopics = [
  "Top Stories",
  "For You",
  "Following",
  "News Showcase",
  "India",
  "World",
  "Local",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
  "Politics",
  "Environment",
  "Education",
  "Travel",
  "Food",
  "Lifestyle",
  "Automotive",
  "Fashion",
  "Real Estate",
  "Economy",
  "Cryptocurrency",
  "Art",
  "Books",
  "Music",
  "Movies",
  "TV",
  "Gaming",
]

const TopicSelectionScreen: React.FC = () => {
  const { user, addTopic, removeTopic, addHighInterestTopic, removeHighInterestTopic } = useUser()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTopics = searchQuery
    ? allTopics.filter((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    : allTopics

  const handleTopicPress = (topic: string) => {
    if (user.topicsOfInterest.includes(topic)) {
      removeTopic(topic)
    } else {
      addTopic(topic)
    }
  }

  const handleTopicLongPress = (topic: string) => {
    if (user.highInterestTopics.includes(topic)) {
      removeHighInterestTopic(topic)
    } else if (user.topicsOfInterest.includes(topic)) {
      addHighInterestTopic(topic)
    }
  }

  const renderTopicItem = ({ item }: { item: string }) => {
    const isSelected = user.topicsOfInterest.includes(item)
    const isHighInterest = user.highInterestTopics.includes(item)

    return (
      <TopicChip
        topic={item}
        selected={isSelected}
        highInterest={isHighInterest}
        onPress={() => handleTopicPress(item)}
        onLongPress={() => handleTopicLongPress(item)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customize Your Feed</Text>
        <Text style={styles.subtitle}>Select topics you're interested in to personalize your news feed</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#5f6368" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#5f6368" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#5f6368" />
        <Text style={styles.infoText}>
          Tap a topic to select/deselect. Long press to mark as high interest for notifications.
        </Text>
      </View>

      <FlatList
        data={filteredTopics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.topicsGrid}
      />

      <View style={styles.selectedTopicsContainer}>
        <Text style={styles.selectedTopicsTitle}>Your Selected Topics</Text>
        <Text style={styles.selectedTopicsCount}>{user.topicsOfInterest.length} topics selected</Text>
        <View style={styles.selectedTopics}>
          {user.topicsOfInterest.map((topic) => (
            <TopicChip
              key={topic}
              topic={topic}
              selected
              highInterest={user.highInterestTopics.includes(topic)}
              onPress={() => handleTopicPress(topic)}
              onLongPress={() => handleTopicLongPress(topic)}
            />
          ))}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#e8f0fe",
    borderRadius: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1a73e8",
    flex: 1,
  },
  topicsGrid: {
    paddingHorizontal: 16,
  },
  selectedTopicsContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTopicsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 4,
  },
  selectedTopicsCount: {
    fontSize: 14,
    color: "#5f6368",
    marginBottom: 12,
  },
  selectedTopics: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

export default TopicSelectionScreen
