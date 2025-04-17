"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native"
import Icon from "./Icon"

// Available news sources
const newsSources = [
  "Google News",
  "BBC",
  "CNN",
  "Reuters",
  "Associated Press",
  "The Guardian",
  "The New York Times",
  "Washington Post",
  "Al Jazeera",
  "NDTV",
]

// Available languages
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ar", name: "Arabic" },
]

// Recency options
const recencyOptions = [
  { value: "all", label: "All Time" },
  { value: "hour", label: "Past Hour" },
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
]

type FilterModalProps = {
  visible: boolean
  onClose: () => void
  currentFilters: {
    sources: string[]
    recency: string
    language: string
  }
  onApply: (filters: FilterModalProps["currentFilters"]) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, currentFilters, onApply }) => {
  const [sources, setSources] = useState<string[]>(currentFilters.sources)
  const [recency, setRecency] = useState(currentFilters.recency)
  const [language, setLanguage] = useState(currentFilters.language)

  useEffect(() => {
    if (visible) {
      // Reset to current filters when modal opens
      setSources(currentFilters.sources)
      setRecency(currentFilters.recency)
      setLanguage(currentFilters.language)
    }
  }, [visible, currentFilters])

  const toggleSource = (source: string) => {
    if (sources.includes(source)) {
      setSources(sources.filter((s) => s !== source))
    } else {
      setSources([...sources, source])
    }
  }

  const handleApply = () => {
    onApply({
      sources,
      recency,
      language,
    })
  }

  const handleReset = () => {
    setSources([])
    setRecency("all")
    setLanguage("en")
  }

  if (!visible) return null

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Filter News</Text>
                <TouchableOpacity onPress={onClose} accessibilityRole="button">
                  <Icon name="close" size={24} color="#5f6368" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>News Sources</Text>
                  <View style={styles.optionsGrid}>
                    {newsSources.map((source) => (
                      <TouchableOpacity
                        key={source}
                        style={[styles.sourceChip, sources.includes(source) && styles.selectedChip]}
                        onPress={() => toggleSource(source)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: sources.includes(source) }}
                      >
                        <Text style={[styles.sourceChipText, sources.includes(source) && styles.selectedChipText]}>
                          {source}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Recency</Text>
                  <View style={styles.optionsList}>
                    {recencyOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.optionItem, recency === option.value && styles.selectedOption]}
                        onPress={() => setRecency(option.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: recency === option.value }}
                      >
                        <Text style={[styles.optionText, recency === option.value && styles.selectedOptionText]}>
                          {option.label}
                        </Text>
                        {recency === option.value && <Icon name="checkmark" size={18} color="#1a73e8" />}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Language</Text>
                  <View style={styles.optionsList}>
                    {languages.map((lang) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[styles.optionItem, language === lang.code && styles.selectedOption]}
                        onPress={() => setLanguage(lang.code)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: language === lang.code }}
                      >
                        <Text style={[styles.optionText, language === lang.code && styles.selectedOptionText]}>
                          {lang.name}
                        </Text>
                        {language === lang.code && <Icon name="checkmark" size={18} color="#1a73e8" />}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset} accessibilityRole="button">
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply} accessibilityRole="button">
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202124",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#202124",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sourceChip: {
    backgroundColor: "#f1f3f4",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    cursor: "pointer",
  },
  selectedChip: {
    backgroundColor: "#e8f0fe",
    borderWidth: 1,
    borderColor: "#1a73e8",
  },
  sourceChipText: {
    fontSize: 14,
    color: "#5f6368",
  },
  selectedChipText: {
    color: "#1a73e8",
    fontWeight: "500",
  },
  optionsList: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    cursor: "pointer",
  },
  selectedOption: {
    backgroundColor: "#e8f0fe",
  },
  optionText: {
    fontSize: 14,
    color: "#5f6368",
  },
  selectedOptionText: {
    color: "#1a73e8",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    cursor: "pointer",
  },
  resetButtonText: {
    color: "#5f6368",
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    cursor: "pointer",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
})

export default FilterModal
