import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ReviewItem from "../components/ReviewItem";
import { auth, db } from "../configurations/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";

const MyReviewScreen = () => {
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(
            collection(db, "reviews"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const reviewsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(reviewsList);
        } else {
          console.log("No user is logged in");
        }
      } catch (error) {
        console.error("Error fetching user reviews: ", error);
      }
    };

    fetchUserReviews();
  }, []);

  return (
    <View className="flex-1 p-2 bg-white">
      <Text className="text-center text-base font-semibold">My Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ width: "100%" }}
      />
      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4 mb-10"
        onPress={() => {
          navigation.navigate("myInfoScreen");
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">
          BACK TO MY PROFILE
        </Text>
        <Icon source={"arrow-left"} color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default MyReviewScreen;
