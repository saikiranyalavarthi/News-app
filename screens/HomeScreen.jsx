import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";

export const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsURL = `https://bharathsamachar.net/wp-json/wp/v2/posts?_embed`;
    try {
      console.log("Get News From :", newsURL);
      setLoading(true);
      setError(null);

      const res = await axios.get(newsURL);
      setNews(res.data); // WordPress API returns array directly
    } catch (err) {
      console.error("Error while fetching news :", err);
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Top Headlines</Text>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Top Headlines</Text>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Headlines</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()} // use unique post ID
        renderItem={({ item }) => <NewsCard news={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});
