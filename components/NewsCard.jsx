import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const NewsCard = ({ news }) => {
  const fallbackImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageUrl =
    news?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    news?.featured_media_url ||
    fallbackImage;

  const title = news?.title?.rendered || "No Title";
  const excerpt = news?.excerpt?.rendered || "";
  const link = news?.link || "";
  const date = news?.date
    ? new Date(news.date).toLocaleDateString()
    : "Unknown date";

  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use useRef to keep animated value stable across renders
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const plainExcerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const displayedExcerpt = expanded ? plainExcerpt : plainExcerpt.slice(0, 150);

  const toggleExpand = () => setExpanded(!expanded);

  const handleShare = (platform) => {
    const encodedLink = encodeURIComponent(link);
    const encodedTitle = encodeURIComponent(
      title.replace(/<\/?[^>]+(>|$)/g, "")
    );

    let shareURL = "";
    switch (platform) {
      case "whatsapp":
        shareURL = `whatsapp://send?text=${encodedTitle}%20${encodedLink}`;
        break;
      case "telegram":
        shareURL = `https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`;
        break;
      case "twitter":
        shareURL = `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "instagram":
        Alert.alert("Note", "Instagram doesn't support direct link sharing.");
        return;
      default:
        return;
    }

    Linking.openURL(shareURL).catch(() =>
      Alert.alert("Error", `Cannot open ${platform}`)
    );
  };

  const openLink = () => {
    if (!link) {
      Alert.alert("No URL", "No link available for this article.");
      return;
    }
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) Linking.openURL(link);
        else Alert.alert("Error", "Can't open the link.");
      })
      .catch(() => Alert.alert("Error", "An error occurred."));
  };

  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded, fadeAnim]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={openLink} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          {!imageLoaded && (
            <View style={[styles.cover, styles.imagePlaceholder]}>
              <ActivityIndicator size="small" color="#888" />
            </View>
          )}

          <Animated.Image
            source={{ uri: imageError ? fallbackImage : imageUrl }}
            style={[styles.cover, { opacity: fadeAnim }]}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true); // stop loading spinner
            }}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={2}>
        {title.replace(/<\/?[^>]+(>|$)/g, "")}
      </Text>
      <Text style={styles.meta}>{date}</Text>

      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.content}>
          {displayedExcerpt}
          {!expanded && "... "}
          <Text style={styles.readMore}>
            {expanded ? " Read less" : " Read more"}
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => handleShare("whatsapp")}>
          <Icon name="whatsapp" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare("telegram")}>
          <Icon name="telegram" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare("twitter")}>
          <Icon name="twitter" size={24} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare("facebook")}>
          <Icon name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    backgroundColor: "#eee",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  meta: {
    fontSize: 12,
    color: "gray",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  content: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingBottom: 10,
    textAlign: "justify",
  },
  readMore: {
    fontSize: 14,
    color: "blue",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
