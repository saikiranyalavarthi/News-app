// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import { HomeScreen } from "../screens/HomeScreen";
// import CategoryScreen from "../screens/CategoryScreen";

// const Tab = createBottomTabNavigator();

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ news }) => ({
//         tabBarIcon: ({ color, size }) => {
//           const icons = {
//             "Mallela Telugu Tejam": "home",
//             "AP News": "newspaper",
//             "Telangana News": "location",
//           };
//           return <Ionicons name={icons[news.name]} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//         headerShown: false,
//       })}
//     >
//       {/* Home Screen */}
//       <Tab.Screen name="Mallela Telugu Tejam" component={HomeScreen} />

//       {/* AP News Category */}
//       <Tab.Screen
//         name="AP News"
//         component={CategoryScreen}
//         initialParams={{ category: "AP News" }}
//       />

//       {/* Telangana News Category */}
//       <Tab.Screen
//         name="Telangana News"
//         component={CategoryScreen}
//         initialParams={{ category: "Telangana News" }}
//       />
//     </Tab.Navigator>
//   );
// }
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
