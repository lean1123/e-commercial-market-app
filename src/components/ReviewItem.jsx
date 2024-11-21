import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configurations/firebaseConfig";
import { AirbnbRating } from "react-native-ratings";

export default function ReviewItem({ review }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userRef = doc(db, "users", review.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.name);
        } else {
          setUserName("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
        setUserName("Unknown User");
      }
    };

    fetchUserName();
  }, [review.userId]);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/user.png")}
          style={styles.reviewImage}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.userIdText}>{userName}</Text>
          <Text style={styles.dateText}>
            {review?.createdAt
              ? new Date(review.createdAt.seconds * 1000).toLocaleString()
              : "No date found"}
          </Text>
        </View>
        <Text style={styles.contentText}>{review?.content}</Text>
        <View style={styles.imageContainer}>
          <AirbnbRating
            count={5}
            defaultRating={review.rating}
            size={20}
            showRating={false}
            isDisabled={true}
          />
        </View>

        <View style={styles.imageContainer}>
          {review.listImageUrl?.map((item, index) => (
            <Image
              source={{ uri: item.url }}
              style={{
                width: 50,
                height: 50,
                marginRight: 5,
              }}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  reviewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userIdText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
  contentText: {
    fontSize: 14,
    color: "#555",
  },
});
