import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import ReviewItem from "./ReviewItem";
import { TouchableOpacity } from "react-native";
import { Backdrop } from "@react-native-material/core";
import ReviewBackDrop from "./ReviewBackDrop";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configurations/firebaseConfig";

export default function Reviews({ productId }) {
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          where("productId", "==", productId)
        );
        const querySnapshot = await getDocs(q);
        const reviewsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [productId]);

  if (reviews.length !== 0) {
    console.log(reviews);
  }

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mt-8 mb-2">
        <Text className="text-xl font-bold">Reviews</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => setShowBackdrop(!showBackdrop)}
        >
          <Text className="text-gray-500">See all</Text>
          <AntDesign name="caretright" size={14} color="gray" />
        </TouchableOpacity>
      </View>
      {/* list review */}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
      />

      <ReviewBackDrop
        visible={showBackdrop}
        onClose={() => setShowBackdrop(false)}
        reviews={reviews}
        productId={productId}
      />
    </View>
  );
}
