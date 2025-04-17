"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "next/router"
import { useUser } from "../context/UserContext"
import NewsCard from "../components/NewsCard"
import TopicChip from "../components/TopicChip"
import PremiumToggle from "../components/PremiumToggle"
import FilterModal from "../components/FilterModal"
import Icon from "../components/Icon"
import { mockNewsData } from "../data/mockData"
import Link from "next/link"

export default function Feed() {
  const { user } = useUser()
  const router = useRouter()
  const initialTopic = (router.query.topic as string) || "For You"

  const [news] = useState(mockNewsData)
  const [filteredNews, setFilteredNews] = useState(mockNewsData)
  const [activeFilter, setActiveFilter] = useState(initialTopic)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sources: [],
    recency: "all",
    language: "en",
  })

  useEffect(() => {
    if (initialTopic && initialTopic !== activeFilter) {
      setActiveFilter(initialTopic)
    }
  }, [initialTopic])

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

  const handleFilterApply = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  const filterOptions = ["For You", "All", ...user.topicsOfInterest]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NewsDigest</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters(true)} accessibilityRole="button">
            <Icon name="filter" size={24} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
            <Icon name="search" size={24} color="#5f6368" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <PremiumToggle />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsContainer}>
          {filterOptions.map((item) => (
            <TopicChip
              key={item}
              topic={item}
              selected={activeFilter === item}
              highInterest={user.highInterestTopics.includes(item)}
              onPress={() => setActiveFilter(item)}
            />
          ))}
        </ScrollView>

        {filteredNews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="newspaper-outline" size={48} color="#c5c5c5" />
            <Text style={styles.emptyText}>No news found matching your filters</Text>
          </View>
        ) : (
          filteredNews.map((item) => <NewsCard key={item.id} {...item} />)
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
            <Icon name="grid-outline" size={24} color="#5f6368" />
            <Text style={styles.tabLabel}>Dashboard</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/feed" passHref>
          <TouchableOpacity style={styles.tabItem} accessibilityRole="button">
            <Icon name="newspaper" size={24} color="#1a73e8" />
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Feed</Text>
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
  topicsContainer: {
    marginVertical: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#5f6368",
    textAlign: "center",
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
