"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type UserContextType = {
  user: {
    name: string
    isPremium: boolean
    topicsOfInterest: string[]
    highInterestTopics: string[]
  }
  updateUser: (data: Partial<UserContextType["user"]>) => void
  togglePremium: () => void
  addTopic: (topic: string) => void
  removeTopic: (topic: string) => void
  addHighInterestTopic: (topic: string) => void
  removeHighInterestTopic: (topic: string) => void
}

const defaultUser = {
  name: "John Doe",
  isPremium: false,
  topicsOfInterest: ["Technology", "Business", "Science"],
  highInterestTopics: ["Technology"],
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(defaultUser)

  const updateUser = (data: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...data }))
  }

  const togglePremium = () => {
    setUser((prev) => ({ ...prev, isPremium: !prev.isPremium }))
  }

  const addTopic = (topic: string) => {
    if (!user.topicsOfInterest.includes(topic)) {
      setUser((prev) => ({
        ...prev,
        topicsOfInterest: [...prev.topicsOfInterest, topic],
      }))
    }
  }

  const removeTopic = (topic: string) => {
    setUser((prev) => ({
      ...prev,
      topicsOfInterest: prev.topicsOfInterest.filter((t) => t !== topic),
      highInterestTopics: prev.highInterestTopics.filter((t) => t !== topic),
    }))
  }

  const addHighInterestTopic = (topic: string) => {
    if (user.topicsOfInterest.includes(topic) && !user.highInterestTopics.includes(topic)) {
      setUser((prev) => ({
        ...prev,
        highInterestTopics: [...prev.highInterestTopics, topic],
      }))
    }
  }

  const removeHighInterestTopic = (topic: string) => {
    setUser((prev) => ({
      ...prev,
      highInterestTopics: prev.highInterestTopics.filter((t) => t !== topic),
    }))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        togglePremium,
        addTopic,
        removeTopic,
        addHighInterestTopic,
        removeHighInterestTopic,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
