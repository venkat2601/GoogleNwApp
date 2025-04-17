"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "../context/UserContext"
import NewsCard from "../components/NewsCard"
import { mockNewsData } from "../data/mockData"
import FilterModal from "../components/FilterModal"

const DashboardScreen: React.FC = () => {
  const { user } = useUser()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sources: [],
    recency: "all",
    language: "en",
  })

  // Group news by topic for the dashboard
  const topicNews = user.topicsOfInterest.reduce(
    (acc, topic) => {
      const topicItems = mockNewsData.filter((item) => item.topic === topic).slice(0, 2) // Show only top 2 news per topic
      if (topicItems.length > 0) {
        acc[topic] = topicItems
      }
      return acc
    },
    {} as Record<string, typeof mockNewsData>,
  )

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const handleFilterApply = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters(true)}>
            <Ionicons name="filter" size={24} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("ShareNews" as never)}>
            <Ionicons name="share-social-outline" size={24} color="#5f6368" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello, {user.name}</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </Text>
        </View>

        {Object.keys(topicNews).length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color="#c5c5c5" />
            <Text style={styles.emptyStateTitle}>No topics selected</Text>
            <Text style={styles.emptyStateText}>
              Select topics of interest in your profile to see personalized news here.
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={() => navigation.navigate("Topics" as never)}>
              <Text style={styles.emptyStateButtonText}>Select Topics</Text>
            </TouchableOpacity>
          </View>
        ) : (
          Object.entries(topicNews).map(([topic, news]) => (
            <View key={topic} style={styles.topicSection}>
              <View style={styles.topicHeader}>
                <Text style={styles.topicTitle}>{topic}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Feed" as never, { initialFilter: topic } as never)}
                >
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
              {news.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        currentFilters={filters}
        onApply={handleFilterApply}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a73e8",
  },
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202124",
  },
  dateText: {
    fontSize: 16,
    color: "#5f6368",
    marginTop: 4,
  },
  topicSection: {
    marginBottom: 24,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
  },
  seeAllText: {
    fontSize: 14,
    color: "#1a73e8",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#5f6368",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: "#1a73e8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  emptyStateButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
})

export default DashboardScreen
