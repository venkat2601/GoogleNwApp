"use client"

import type React from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"

const NewsDetailScreen: React.FC<{
  route: {
    params: {
      id: string
      title: string
      summary: string
      imageUrl: string
      source: string
      publishedAt: string
      topic: string
      url: string
      isPremium: boolean
    }
  }
}> = ({ route }) => {
  const { title, summary, imageUrl, source, publishedAt, topic, url, isPremium } = route.params
  const { user } = useUser()

  const handleOpenFullStory = () => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.topic}>{topic}</Text>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{source}</Text>
            <Text style={styles.date}>{publishedAt}</Text>
          </View>

          {isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={14} color="#fff" />
              <Text style={styles.premiumText}>AI Summary</Text>
            </View>
          )}

          <Text style={styles.summary}>{summary}</Text>

          <TouchableOpacity style={styles.fullStoryButton} onPress={handleOpenFullStory}>
            <Text style={styles.fullStoryText}>Read Full Story</Text>
            <Ionicons name="open-outline" size={16} color="#1a73e8" />
          </TouchableOpacity>
        </View>

        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Related Stories</Text>

          <TouchableOpacity style={styles.relatedItem}>
            <Image source={{ uri: "https://picsum.photos/200/200?random=1" }} style={styles.relatedImage} />
            <View style={styles.relatedContent}>
              <Text style={styles.relatedItemTitle} numberOfLines={2}>
                Related news story about this topic
              </Text>
              <Text style={styles.relatedSource}>The News Source</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.relatedItem}>
            <Image source={{ uri: "https://picsum.photos/200/200?random=2" }} style={styles.relatedImage} />
            <View style={styles.relatedContent}>
              <Text style={styles.relatedItemTitle} numberOfLines={2}>
                Another related story that might interest you
              </Text>
              <Text style={styles.relatedSource}>Different Source</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
  },
  content: {
    padding: 16,
  },
  topic: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 12,
    lineHeight: 32,
  },
  sourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    color: "#5f6368",
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#5f6368",
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a73e8",
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  premiumText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#202124",
    marginBottom: 24,
  },
  fullStoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#1a73e8",
    borderRadius: 24,
    marginBottom: 24,
  },
  fullStoryText: {
    color: "#1a73e8",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  relatedSection: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  relatedImage: {
    width: 80,
    height: 80,
  },
  relatedContent: {
    flex: 1,
    padding: 12,
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#202124",
    marginBottom: 4,
  },
  relatedSource: {
    fontSize: 12,
    color: "#5f6368",
  },
})

export default NewsDetailScreen
