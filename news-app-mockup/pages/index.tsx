"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useUser } from "../context/UserContext"
import NewsCard from "../components/NewsCard"
import FilterModal from "../components/FilterModal"
import Icon from "../components/Icon"
import { mockNewsData } from "../data/mockData"
import Link from "next/link"

export default function Home() {
  const { user } = useUser()
  const [activeFilter, setActiveFilter] = useState("For You")
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

  const handleFilterApply = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters(true)} accessibilityRole="button">
            <Icon name="filter" size={24} color="#5f6368" />
          </TouchableOpacity>
          <Link href="/share" passHref>
            <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
              <Icon name="share-social-outline" size={24} color="#5f6368" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello, {user.name}</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </Text>
        </View>

        {Object.keys(topicNews).length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="newspaper-outline" size={48} color="#c5c5c5" />
            <Text style={styles.emptyStateTitle}>No topics selected</Text>
            <Text style={styles.emptyStateText}>
              Select topics of interest in your profile to see personalized news here.
            </Text>
            <Link href="/topics" passHref>
              <TouchableOpacity style={styles.emptyStateButton} accessibilityRole="button">
                <Text style={styles.emptyStateButtonText}>Select Topics</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          Object.entries(topicNews).map(([topic, news]) => (
            <View key={topic} style={styles.topicSection}>
              <View style={styles.topicHeader}>
                <Text style={styles.topicTitle}>{topic}</Text>
                <Link href={`/feed?topic=${topic}`} passHref>
                  <TouchableOpacity accessibilityRole="button">
                    <Text style={styles.seeAllText}>See all</Text>
                  </TouchableOpacity>
                </Link>
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

      <View style={styles.tabBar}>
        <Link href="/" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="grid" size={24} color="#1a73e8" />
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Dashboard</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/feed" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="newspaper-outline" size={24} color="#5f6368" />
            <Text style={styles.tabLabel}>Feed</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/topics" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="list-outline" size={24} color="#5f6368" />
            <Text style={styles.tabLabel}>Topics</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/notifications" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="notifications-outline" size={24} color="#5f6368" />
            <Text style={styles.tabLabel}>Alerts</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="person-outline" size={24} color="#5f6368" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    height: "100vh",
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
    cursor: "pointer",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
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
    cursor: "pointer",
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
    cursor: "pointer",
  },
  emptyStateButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 8,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
    padding: 8,
    cursor: "pointer",
  },
  tabLabel: {
    fontSize: 12,
    color: "#5f6368",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#1a73e8",
    fontWeight: "500",
  },
})
