import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { SplashScreen } from "./screens/SplashScreen";
import { HomeScreen } from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = "home";

        if (route.name === "ఆంధ్రప్రదేశ్") iconName = "newspaper-outline";
        else if (route.name === "తెలంగాణ") iconName = "map-outline";
        else if (route.name === "జిల్లా వార్తలు") iconName = "list-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
      name="ఆంధ్రప్రదేశ్"
      component={CategoryScreen}
      initialParams={{ category: "ఆంధ్రప్రదేశ్" }}
    />
    <Tab.Screen
      name="తెలంగాణ"
      component={CategoryScreen}
      initialParams={{ category: "తెలంగాణ" }}
    />
    <Tab.Screen
      name="జిల్లా వార్తలు"
      component={CategoryScreen}
      initialParams={{ category: "జిల్లా వార్తలు" }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Bharathsamachar">
    <Drawer.Screen name="Bharathsamachar" component={BottomTabs} />
    <Drawer.Screen
      name="CM View"
      component={CategoryScreen}
      initialParams={{ category: "CM View" }}
    />
    <Drawer.Screen
      name="జాతీయం"
      component={CategoryScreen}
      initialParams={{ category: "జాతీయం" }}
    />
    <Drawer.Screen
      name="అంతర్జాతీయం"
      component={CategoryScreen}
      initialParams={{ category: "అంతర్జాతీయం" }}
    />
    <Drawer.Screen
      name="సినిమా"
      component={CategoryScreen}
      initialParams={{ category: "సినిమా" }}
    />
    <Drawer.Screen
      name="క్రైమ్"
      component={CategoryScreen}
      initialParams={{ category: "క్రైమ్" }}
    />
    <Drawer.Screen
      name="పాలిటిక్స్"
      component={CategoryScreen}
      initialParams={{ category: "పాలిటిక్స్" }}
    />
    <Drawer.Screen
      name="స్పోర్ట్స్"
      component={CategoryScreen}
      initialParams={{ category: "స్పోర్ట్స్" }}
    />
    <Drawer.Screen
      name="స్టడీ / జాబ్స్"
      component={CategoryScreen}
      initialParams={{ category: "స్టడీ / జాబ్స్" }}
    />
    <Drawer.Screen
      name="బిజినెస్"
      component={CategoryScreen}
      initialParams={{ category: "బిజినెస్" }}
    />
    <Drawer.Screen
      name="లైఫ్ స్టైల్"
      component={CategoryScreen}
      initialParams={{ category: "లైఫ్ స్టైల్" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
