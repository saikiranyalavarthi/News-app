import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NewsCard } from "../components/NewsCard"; // Your NewsCard component

const WORDPRESS_API_BASE = "https://bharathsamachar.net/wp-json/wp/v2";

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch posts when selectedCategoryId changes
  useEffect(() => {
    if (selectedCategoryId !== null) {
      fetchPostsByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setError(null);
    try {
      const response = await fetch(`${WORDPRESS_API_BASE}/categories`);
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategoryId(data[0].id); // Select first category by default
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchPostsByCategory = async (categoryId) => {
    setLoadingPosts(true);
    setError(null);
    try {
      const response = await fetch(
        `${WORDPRESS_API_BASE}/posts?categories=${categoryId}&_embed`
      );
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  if (loadingCategories) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Categories list */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategoryId === item.id && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategoryId(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategoryId === item.id && styles.categoryTextSelected,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Posts list */}
      {loadingPosts ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ff0000" />
          <Text>Loading posts...</Text>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.centered}>
          <Text>No posts available for this category.</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NewsCard news={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoriesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  categoryButton: {
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  categoryButtonSelected: {
    backgroundColor: "#ff0000",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
