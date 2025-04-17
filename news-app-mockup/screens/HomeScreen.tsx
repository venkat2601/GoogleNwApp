"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native"
import NewsCard from "../components/NewsCard"
import TopicChip from "../components/TopicChip"
import PremiumToggle from "../components/PremiumToggle"
import FilterModal from "../components/FilterModal"
import { useUser } from "../context/UserContext"
import { mockNewsData } from "../data/mockData"

const HomeScreen: React.FC = () => {
  const { user } = useUser()
  const route = useRoute()
  const initialFilter = route.params?.initialFilter

  const [news, setNews] = useState(mockNewsData)
  const [filteredNews, setFilteredNews] = useState(mockNewsData)
  const [refreshing, setRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState(initialFilter || "For You")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sources: [],
    recency: "all",
    language: "en",
  })

  useEffect(() => {
    // Apply topic filter first
    let result = news

    if (activeFilter === "For You") {
      result = news.filter((item) => user.topicsOfInterest.includes(item.topic))
    } else if (activeFilter !== "All") {
      result = news.filter((item) => item.topic === activeFilter)
    }

    // Then apply additional filters
    if (filters.sources.length > 0) {
      result = result.filter((item) => filters.sources.includes(item.source))
    }

    // For demo purposes, we're not actually filtering by recency and language
    // In a real app, these would be applied here

    setFilteredNews(result)
  }, [activeFilter, news, user.topicsOfInterest, filters])

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

  const filterOptions = ["For You", "All", ...user.topicsOfInterest]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NewsDigest</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters(true)}>
            <Ionicons name="filter" size={24} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#5f6368" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard {...item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            <PremiumToggle />
            <FlatList
              horizontal
              data={filterOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TopicChip
                  topic={item}
                  selected={activeFilter === item}
                  highInterest={user.highInterestTopics.includes(item)}
                  onPress={() => setActiveFilter(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topicsContainer}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#1a73e8" />
            <Text style={styles.emptyText}>No news found matching your filters</Text>
          </View>
        }
      />

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
  listContent: {
    padding: 16,
  },
  topicsContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#5f6368",
    textAlign: "center",
  },
})

export default HomeScreen
