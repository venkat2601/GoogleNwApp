import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Screens
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import TopicSelectionScreen from "./screens/TopicSelectionScreen"
import NewsDetailScreen from "./screens/NewsDetailScreen"
import NotificationsScreen from "./screens/NotificationsScreen"

// Context
import { UserProvider } from "./context/UserContext"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Feed") {
            iconName = focused ? "newspaper" : "newspaper-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Topics") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#1a73e8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Feed" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Topics" component={TopicSelectionScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: "News Detail" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  )
}
