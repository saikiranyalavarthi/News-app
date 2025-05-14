// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { styles } from "./App.styles";
// import axios from "axios";
// import { NewsCard } from "../components/NewsCard";

// export const HomeScreen = () => {
//   const BLOG_ID = "5061067785298055620"; // Replace with your API_KEY
//   const API_KEY = "AIzaSyD_gWfFjy9ZQjpmpJ6shIJGQILlEtM7h8Q";
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     const newsURL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
//     try {
//       console.log("Get News From :", newsURL);
//       const res = await axios.get(newsURL);
//       // console.log("News :",res.data);
//       setNews(res.data.articles);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error while fetching news :", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text
//         style={styles.title}
//       >{`Top Headlines in ${COUNTRY.toUpperCase()}`}</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#ff0000" />
//       ) : (
//         <FlatList
//           data={news}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => <NewsCard news={item} />}
//         />
//       )}
//     </View>
//   );
// };
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { styles } from "./App.styles";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";

export const HomeScreen = () => {
  const BLOG_ID = "5061067785298055620";
  const API_KEY = "AIzaSyD_gWfFjy9ZQjpmpJ6shIJGQILlEtM7h8Q";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsURL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
    try {
      console.log("Get News From :", newsURL);
      const res = await axios.get(newsURL);
      setNews(res.data.items); // corrected from articles to items
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching news :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Headlines</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsCard news={item} />}
        />
      )}
    </View>
  );
};
