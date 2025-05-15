import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function DetailsScreen({ route }) {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  image: { width: "100%", height: 200, marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24 },
});
