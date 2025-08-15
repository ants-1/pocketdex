import { HapticTab } from "@/components/HapticTap";
import { Tabs } from "expo-router";
import { TabIcon } from "@/components/TabIcon";

const tabIcons = {
  home: { type: "MaterialIcons", name: "home" },
  pokedex: { type: "MaterialCommunityIcons", name: "pokeball" },
  mydex: { type: "MaterialIcons", name: "favorite" },
  quiz: { type: "MaterialIcons", name: "quiz" },

}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EF4444",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#18181b",
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabIcon type={tabIcons.home.type} name={tabIcons.home.name} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pokedex"
        options={{
          title: "Pokedex",
          tabBarIcon: ({ color }) => (
            <TabIcon type={tabIcons.pokedex.type} name={tabIcons.pokedex.name} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mydex"
        options={{
          title: "MyDex",
          tabBarIcon: ({ color }) => (
            <TabIcon type={tabIcons.mydex.type} name={tabIcons.mydex.name} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color }) => (
            <TabIcon type={tabIcons.quiz.type} name={tabIcons.quiz.name} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}