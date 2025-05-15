// import { SafeAreaView, StyleSheet, Text, View } from "react-native";

// import { SplashScreen } from "./screens/SplashScreen";
// import { HomeScreen } from "./screens/HomeScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import CategoryScreen from "./screens/CategoryScreen";

// export default function App() {
//   const Stack = createStackNavigator();
//   const Drawer = createDrawerNavigator();

//   // Stack for Splash Screen and Home Screen
//   const MainStack = () => (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="News-App" component={SplashScreen} />
//       <Stack.Screen name="Home" component={DrawerNavigator} />
//     </Stack.Navigator>
//   );

//   // Drawer Navigator with different news categories
//   const DrawerNavigator = () => (
//     <Drawer.Navigator initialRouteName="Mallela Telugu Tejam">
//       {/* Home Screen */}
//       <Drawer.Screen name="Mallela Telugu Tejam" component={HomeScreen} />

//       {/* Category Screens with respective categories */}
//       <Drawer.Screen
//         name="AP News"
//         component={CategoryScreen}
//         initialParams={{ category: "AP News" }}
//       />
//       <Drawer.Screen
//         name="Bhakthi"
//         component={CategoryScreen}
//         initialParams={{ category: "Bhakthi" }}
//       />
//       <Drawer.Screen
//         name="Crime"
//         component={CategoryScreen}
//         initialParams={{ category: "Crime" }}
//       />
//       <Drawer.Screen
//         name="Editorial"
//         component={CategoryScreen}
//         initialParams={{ category: "Editorial" }}
//       />
//       <Drawer.Screen
//         name="Kapu News"
//         component={CategoryScreen}
//         initialParams={{ category: "Kapu News" }}
//       />
//       <Drawer.Screen
//         name="National"
//         component={CategoryScreen}
//         initialParams={{ category: "National" }}
//       />
//       <Drawer.Screen
//         name="Telangana News"
//         component={CategoryScreen}
//         initialParams={{ category: "Telangana News" }}
//       />
//       <Drawer.Screen
//         name="Videos"
//         component={CategoryScreen}
//         initialParams={{ category: "Videos" }}
//       />
//     </Drawer.Navigator>
//   );

//   return (
//     <NavigationContainer>
//       <MainStack />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eee",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { SplashScreen } from "./screens/SplashScreen";
import { HomeScreen } from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import DetailsScreen from "./navigation/DetailsScreen.js";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// 🔻 Bottom Tabs with 3 screens only
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = "home";

        if (route.name === "AP News") iconName = "newspaper-outline";
        else if (route.name === "Telangana News") iconName = "map-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
      name="AP News"
      component={CategoryScreen}
      initialParams={{ category: "AP News" }}
    />
    <Tab.Screen
      name="Telangana News"
      component={CategoryScreen}
      initialParams={{ category: "Telangana News" }}
    />
  </Tab.Navigator>
);

// 🔻 Drawer includes BottomTabs + other categories
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Mallela Telugu Tejam">
    <Drawer.Screen name="Mallela Telugu Tejam" component={BottomTabs} />
    <Drawer.Screen
      name="Bhakthi"
      component={CategoryScreen}
      initialParams={{ category: "Bhakthi" }}
    />
    <Drawer.Screen
      name="Crime"
      component={CategoryScreen}
      initialParams={{ category: "Crime" }}
    />
    <Drawer.Screen
      name="Editorial"
      component={CategoryScreen}
      initialParams={{ category: "Editorial" }}
    />
    <Drawer.Screen
      name="Kapu News"
      component={CategoryScreen}
      initialParams={{ category: "Kapu News" }}
    />
    <Drawer.Screen
      name="National"
      component={CategoryScreen}
      initialParams={{ category: "National" }}
    />
    <Drawer.Screen
      name="Videos"
      component={CategoryScreen}
      initialParams={{ category: "Videos" }}
    />
  </Drawer.Navigator>
);

// 🔻 Main Stack (Splash ➝ Drawer)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="News-App" component={SplashScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
