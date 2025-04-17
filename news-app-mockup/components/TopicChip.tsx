import type React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type TopicChipProps = {
  topic: string
  selected?: boolean
  highInterest?: boolean
  onPress: () => void
  onLongPress?: () => void
}

const TopicChip: React.FC<TopicChipProps> = ({
  topic,
  selected = false,
  highInterest = false,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip, highInterest && styles.highInterestChip]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={[styles.chipText, selected && styles.selectedChipText, highInterest && styles.highInterestChipText]}>
        {topic}
      </Text>
      {highInterest && <Ionicons name="notifications" size={14} color="#fff" style={styles.icon} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#f1f3f4",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#e8f0fe",
    borderWidth: 1,
    borderColor: "#1a73e8",
  },
  highInterestChip: {
    backgroundColor: "#1a73e8",
  },
  chipText: {
    fontSize: 14,
    color: "#5f6368",
  },
  selectedChipText: {
    color: "#1a73e8",
    fontWeight: "500",
  },
  highInterestChipText: {
    color: "#fff",
    fontWeight: "500",
  },
  icon: {
    marginLeft: 4,
  },
})

export default TopicChip
