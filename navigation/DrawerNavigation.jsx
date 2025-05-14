import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Drawer.Screen name="Home" component={HomeScreen} />

        {/* Category Screens with respective categories */}
        <Drawer.Screen
          name="AP News"
          component={CategoryScreen}
          initialParams={{ category: "AP News" }}
        />
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
          name="Telangana News"
          component={CategoryScreen}
          initialParams={{ category: "Telangana News" }}
        />
        <Drawer.Screen
          name="Videos"
          component={CategoryScreen}
          initialParams={{ category: "Videos" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
