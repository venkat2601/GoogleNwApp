"use client"

import type React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"

type NewsCardProps = {
  id: string
  title: string
  summary: string
  fullSummary: string
  imageUrl: string
  source: string
  publishedAt: string
  topic: string
  url: string
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  summary,
  fullSummary,
  imageUrl,
  source,
  publishedAt,
  topic,
  url,
}) => {
  const navigation = useNavigation()
  const { user } = useUser()
  const displayText = user.isPremium ? fullSummary : summary

  const handlePress = () => {
    navigation.navigate(
      "NewsDetail" as never,
      {
        id,
        title,
        summary: user.isPremium ? fullSummary : summary,
        imageUrl,
        source,
        publishedAt,
        topic,
        url,
        isPremium: user.isPremium,
      } as never,
    )
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.topic}>{topic}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.summary} numberOfLines={user.isPremium ? 6 : 3}>
            {displayText}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.source}>{source}</Text>
            <Text style={styles.date}>{publishedAt}</Text>
          </View>
        </View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      {user.isPremium && (
        <View style={styles.premiumBadge}>
          <Ionicons name="star" size={12} color="#fff" />
          <Text style={styles.premiumText}>AI Summary</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  topic: {
    color: "#1a73e8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#202124",
  },
  summary: {
    fontSize: 14,
    color: "#5f6368",
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  source: {
    fontSize: 12,
    color: "#5f6368",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#5f6368",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  premiumBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#1a73e8",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  premiumText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
})

export default NewsCard
