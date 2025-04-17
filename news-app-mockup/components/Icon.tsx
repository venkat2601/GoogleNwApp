import type React from "react"

// Using Ionicons web version
const iconMap: Record<string, string> = {
  newspaper: "📰",
  "newspaper-outline": "📰",
  person: "👤",
  "person-outline": "👤",
  list: "📋",
  "list-outline": "📋",
  notifications: "🔔",
  "notifications-outline": "🔔",
  grid: "📊",
  "grid-outline": "📊",
  search: "🔍",
  filter: "🔍",
  star: "⭐",
  "star-outline": "☆",
  checkmark: "✓",
  close: "✕",
  pencil: "✏️",
  "information-circle-outline": "ℹ️",
  "share-social-outline": "🔗",
  "logo-whatsapp": "📱",
  "logo-twitter": "🐦",
  "trash-outline": "🗑️",
  "open-outline": "↗️",
  "time-outline": "⏱️",
  "heart-outline": "❤️",
  "trending-up-outline": "📈",
  "settings-outline": "⚙️",
  analytics: "📊",
}

type IconProps = {
  name: string
  size?: number
  color?: string
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "black" }) => {
  return (
    <span
      style={{
        fontSize: size,
        color,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="img"
      aria-label={name}
    >
      {iconMap[name] || "•"}
    </span>
  )
}

export default Icon
