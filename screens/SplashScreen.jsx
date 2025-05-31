import React, { useEffect } from "react";
import { Text } from "react-native";
import { Image } from "react-native";
import { View, StyleSheet } from "react-native";

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.splashCard}
        source={require("../assets/logo.png")} // ✅ Use Image for static JPG
        resizeMode="contain"
        backgroundColor=""
      />
      {/* 
      <Text style={styles.title}>News App</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  splashCard: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
