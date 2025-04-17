"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
  Alert,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { mockNewsData } from "../data/mockData"
import { useUser } from "../context/UserContext"

const { width } = Dimensions.get("window")
const SWIPE_THRESHOLD = 120

const ShareNewsScreen: React.FC = () => {
  const { user } = useUser()
  const [selectedNews, setSelectedNews] = useState<string[]>([])
  const [newsItems, setNewsItems] = useState(mockNewsData)

  const handleSelectNews = (id: string) => {
    if (selectedNews.includes(id)) {
      setSelectedNews(selectedNews.filter((itemId) => itemId !== id))
    } else {
      setSelectedNews([...selectedNews, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedNews.length === newsItems.length) {
      setSelectedNews([])
    } else {
      setSelectedNews(newsItems.map((item) => item.id))
    }
  }

  const handleRemoveItem = (id: string) => {
    setNewsItems(newsItems.filter((item) => item.id !== id))
    setSelectedNews(selectedNews.filter((itemId) => itemId !== id))
  }

  const handleShare = async (platform: "whatsapp" | "twitter") => {
    if (selectedNews.length === 0) {
      Alert.alert("No Items Selected", "Please select at least one news item to share.")
      return
    }

    const selectedItems = newsItems.filter((item) => selectedNews.includes(item.id))

    // Create a shareable link with selected news IDs
    const shareableLink = `https://newsapp.example.com/share?ids=${selectedItems.map((item) => item.id).join(",")}`

    // Create message with titles of selected news
    const message = `Check out these news stories:\n\n${selectedItems
      .map((item) => `• ${item.title}`)
      .join("\n\n")}\n\n${shareableLink}`

    try {
      const result = await Share.share({
        message,
        url: shareableLink,
        title: "Shared News",
      })

      if (result.action === Share.sharedAction) {
        console.log("Shared successfully")
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while sharing")
    }
  }

  const renderNewsItem = ({ item }: { item: (typeof mockNewsData)[0] }) => {
    const isSelected = selectedNews.includes(item.id)

    // Animation for swipe
    const position = useRef(new Animated.Value(0)).current

    // PanResponder for swipe gesture
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx < 0) {
            // Only allow swiping left
            position.setValue(gestureState.dx)
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -SWIPE_THRESHOLD) {
            Animated.timing(position, {
              toValue: -width,
              duration: 250,
              useNativeDriver: true,
            }).start(() => handleRemoveItem(item.id))
          } else {
            Animated.spring(position, {
              toValue: 0,
              useNativeDriver: true,
            }).start()
          }
        },
      }),
    ).current

    return (
      <Animated.View
        style={[styles.itemContainer, { transform: [{ translateX: position }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={[styles.checkboxContainer, isSelected && styles.checkboxSelected]}
          onPress={() => handleSelectNews(item.id)}
        >
          {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemSource}>{item.source}</Text>
        </View>
        <View style={styles.deleteIndicator}>
          <Ionicons name="trash-outline" size={20} color="#ff3b30" />
          <Text style={styles.deleteText}>Swipe to delete</Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Share News</Text>
        <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.selectAllText}>
            {selectedNews.length === newsItems.length ? "Deselect All" : "Select All"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructions}>
        Select news items to share, swipe right to remove items from the share list
      </Text>

      <FlatList
        data={newsItems}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#c5c5c5" />
            <Text style={styles.emptyText}>No news items available</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>{selectedNews.length} items selected</Text>
        <View style={styles.shareButtons}>
          <TouchableOpacity
            style={[styles.shareButton, styles.whatsappButton]}
            onPress={() => handleShare("whatsapp")}
            disabled={selectedNews.length === 0}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shareButton, styles.twitterButton]}
            onPress={() => handleShare("twitter")}
            disabled={selectedNews.length === 0}
          >
            <Ionicons name="logo-twitter" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>X</Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#202124",
  },
  selectAllText: {
    color: "#1a73e8",
    fontWeight: "500",
  },
  instructions: {
    fontSize: 14,
    color: "#5f6368",
    padding: 16,
    backgroundColor: "#e8f0fe",
    borderBottomWidth: 1,
    borderBottomColor: "#c2d7f8",
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1a73e8",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#1a73e8",
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#202124",
    marginBottom: 4,
  },
  itemSource: {
    fontSize: 14,
    color: "#5f6368",
  },
  deleteIndicator: {
    position: "absolute",
    right: -80,
    top: 0,
    bottom: 0,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 10,
    color: "#ff3b30",
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#5f6368",
    marginTop: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  selectedCount: {
    fontSize: 14,
    color: "#5f6368",
    marginBottom: 12,
  },
  shareButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  twitterButton: {
    backgroundColor: "#000000",
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 8,
  },
})

export default ShareNewsScreen
