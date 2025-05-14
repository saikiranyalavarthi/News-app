import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { NewsCard } from "../components/NewsCard";
import { styles } from "./App.styles";
const BLOG_ID = "5061067785298055620";
const API_KEY = "AIzaSyD_gWfFjy9ZQjpmpJ6shIJGQILlEtM7h8Q"; // Replace with your API Key

const CategoriesScreen = ({ route }) => {
  const { category } = route.params;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const newsURL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&labels=${encodeURIComponent(
        category
      )}`;
      const response = await fetch(newsURL);
      const data = await response.json();

      if (data.items) {
        setNews(data.items); // Set the fetched news
      } else {
        setNews([]); // If no items found
      }
      setLoading(false); // Stop loading spinner
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{category.toUpperCase()} NEWS</Text> */}
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsCard news={item} />}
      />
    </View>
  );
};

export default CategoriesScreen;
