// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Linking,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// export const NewsCard = ({ news }) => {
//   /* 1️⃣  Choose the best image */
//   const imageUrl =
//     news?.images?.[0]?.url || // preferred: Blogger's images array
//     news?.content?.match(/<img[^>]+src="([^">]+)/)?.[1]; // fallback: first <img>

//   /* 2️⃣  Other post info */
//   const title = news?.title;
//   const author = news?.author?.displayName ?? "Unknown";
//   const date = new Date(news?.published).toDateString();
//   const description = news?.description || "No description available"; // New description field

//   // Share function
//   const handleShare = (platform) => {
//     const url = news?.url; // Assuming each news item has a URL
//     const encoded = encodeURIComponent(url);

//     let shareURL = "";
//     switch (platform) {
//       case "whatsapp":
//         shareURL = `whatsapp://send?text=${encoded}`;
//         break;
//       case "telegram":
//         shareURL = `https://t.me/share/url?url=${url}&text=${title}`;
//         break;
//       case "facebook":
//         shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
//         break;
//       case "instagram":
//         Alert.alert("Note", "Instagram doesn't support direct link sharing.");
//         return;
//       default:
//         return;
//     }

//     Linking.openURL(shareURL).catch(() =>
//       Alert.alert("Error", `Cannot open ${platform}`)
//     );
//   };

//   return (
//     <View style={styles.card}>
//       {imageUrl && (
//         <Image
//           source={{ uri: imageUrl }}
//           style={styles.cover}
//           resizeMode="cover"
//         />
//       )}

//       <Text style={styles.title}>{title}</Text>

//       <Text style={styles.meta}>
//         {author} · {date}
//       </Text>

//       {/* Social Share Icons */}
//       <View style={styles.socialIcons}>
//         <TouchableOpacity onPress={() => handleShare("whatsapp")}>
//           <Icon name="whatsapp" size={24} color="green" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handleShare("telegram")}>
//           <Icon name="telegram" size={24} color="blue" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handleShare("instagram")}>
//           <Icon name="instagram" size={24} color="purple" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handleShare("facebook")}>
//           <Icon name="facebook" size={24} color="#3b5998" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     marginVertical: 10,
//     marginHorizontal: 16,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     overflow: "hidden", // so the image corners are rounded too
//     elevation: 3,
//   },
//   cover: {
//     width: "100%",
//     height: 180, // give remote images a height
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     padding: 10,
//   },
//   meta: {
//     fontSize: 12,
//     color: "gray",
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
//   socialIcons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const NewsCard = ({ news }) => {
  // 1️⃣ Choose the best image
  const imageUrl =
    news?.images?.[0]?.url || // preferred: Blogger's images array
    news?.content?.match(/<img[^>]+src="([^">]+)/)?.[1]; // fallback: first <img>

  // 2️⃣ Other post info
  const title = news?.title;
  const author = news?.author?.displayName ?? "Unknown";
  const date = new Date(news?.published).toDateString();

  // Handling content expansion
  const [expandedPostIds, setExpandedPostIds] = useState([]);
  const isExpanded = expandedPostIds.includes(news?.id);
  const plainText = news?.content.replace(/<[^>]+>/g, ""); // Removing HTML tags

  const displayedContent = isExpanded ? plainText : plainText.slice(0, 150); // Truncate content

  const toggleExpand = (id) => {
    if (expandedPostIds.includes(id)) {
      setExpandedPostIds(expandedPostIds.filter((postId) => postId !== id));
    } else {
      setExpandedPostIds([...expandedPostIds, id]);
    }
  };

  // Share function
  const handleShare = (platform) => {
    const url = news?.url; // Assuming each news item has a URL
    const encoded = encodeURIComponent(url);

    let shareURL = "";
    switch (platform) {
      case "whatsapp":
        shareURL = `whatsapp://send?text=${encoded}`;
        break;
      case "telegram":
        shareURL = `https://t.me/share/url?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
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

  return (
    <View style={styles.card}>
      {/* Displaying Image */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
      )}

      {/* Title and Metadata */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>
        {author} · {date}
      </Text>

      {/* Content Display */}
      <TouchableOpacity onPress={() => toggleExpand(news?.id)}>
        <Text style={styles.content}>
          {displayedContent}
          {!isExpanded && "... "}
          <Text style={styles.readMore}>
            {isExpanded ? "Read less" : "Read more"}
          </Text>
        </Text>
      </TouchableOpacity>

      {/* Social Share Icons */}
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
    overflow: "hidden", // so the image corners are rounded too
    elevation: 3,
  },
  cover: {
    width: "100%",
    height: 180, // give remote images a height
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  meta: {
    fontSize: 12,
    color: "gray",
    paddingHorizontal: 10,
    // paddingBottom: 10,
  },
  content: {
    fontSize: 14,
    paddingHorizontal: 10,
    // paddingBottom: 10,
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
