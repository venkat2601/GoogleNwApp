"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useUser } from "../context/UserContext"
import Icon from "../components/Icon"
import { mockNewsData } from "../data/mockData"
import Link from "next/link"

export default function Share() {
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

    // In a web environment, we'd use the Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared News",
          text: message,
          url: shareableLink,
        })
        console.log("Shared successfully")
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share via ${platform === "whatsapp" ? "WhatsApp" : "X (Twitter)"}:\n\n${message}`)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" passHref>
          <TouchableOpacity style={styles.backButton} accessibilityRole="button">
            <Icon name="close" size={24} color="#5f6368" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Share News</Text>
        <TouchableOpacity onPress={handleSelectAll} accessibilityRole="button">
          <Text style={styles.selectAllText}>
            {selectedNews.length === newsItems.length ? "Deselect All" : "Select All"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructions}>
        Select news items to share, click the delete button to remove items from the share list
      </Text>

      <View style={styles.listContent}>
        {newsItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="document-text-outline" size={48} color="#c5c5c5" />
            <Text style={styles.emptyText}>No news items available</Text>
          </View>
        ) : (
          newsItems.map((item) => {
            const isSelected = selectedNews.includes(item.id)

            return (
              <View key={item.id} style={styles.itemContainer}>
                <TouchableOpacity
                  style={[styles.checkboxContainer, isSelected && styles.checkboxSelected]}
                  onPress={() => handleSelectNews(item.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isSelected }}
                >
                  {isSelected && <Icon name="checkmark" size={16} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemSource}>{item.source}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveItem(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel="Delete item"
                >
                  <Icon name="trash-outline" size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            )
          })
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>{selectedNews.length} items selected</Text>
        <View style={styles.shareButtons}>
          <TouchableOpacity
            style={[styles.shareButton, styles.whatsappButton, selectedNews.length === 0 && styles.disabledButton]}
            onPress={() => handleShare("whatsapp")}
            disabled={selectedNews.length === 0}
            accessibilityRole="button"
          >
            <Icon name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shareButton, styles.twitterButton, selectedNews.length === 0 && styles.disabledButton]}
            onPress={() => handleShare("twitter")}
            disabled={selectedNews.length === 0}
            accessibilityRole="button"
          >
            <Icon name="logo-twitter" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>X</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 4,
    cursor: "pointer",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#202124",
  },
  selectAllText: {
    color: "#1a73e8",
    fontWeight: "500",
    cursor: "pointer",
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
    flex: 1,
    overflow: "auto",
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
    alignItems: "center",
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
    cursor: "pointer",
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
  deleteButton: {
    padding: 8,
    cursor: "pointer",
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
    cursor: "pointer",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  twitterButton: {
    backgroundColor: "#000000",
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 8,
  },
})

export default Share
