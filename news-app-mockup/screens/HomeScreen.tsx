"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import NewsCard from "../components/NewsCard"
import TopicChip from "../components/TopicChip"
import PremiumToggle from "../components/PremiumToggle"
import { useUser } from "../context/UserContext"
import { mockNewsData } from "../data/mockData"

const HomeScreen: React.FC = () => {
  const { user } = useUser()
  const [news, setNews] = useState(mockNewsData)
  const [filteredNews, setFilteredNews] = useState(mockNewsData)
  const [refreshing, setRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState("For You")

  useEffect(() => {
    if (activeFilter === "For You") {
      setFilteredNews(news.filter((item) => user.topicsOfInterest.includes(item.topic)))
    } else if (activeFilter !== "All") {
      setFilteredNews(news.filter((item) => item.topic === activeFilter))
    } else {
      setFilteredNews(news)
    }
  }, [activeFilter, news, user.topicsOfInterest])

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const filterOptions = ["For You", "All", ...user.topicsOfInterest]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NewsDigest</Text>
        <View style={styles.headerRight}>
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
            <Text style={styles.emptyText}>Loading news...</Text>
          </View>
        }
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
