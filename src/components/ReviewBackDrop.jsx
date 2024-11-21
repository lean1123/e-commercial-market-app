import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, TextInput } from "react-native-paper";
import ReviewItem from "./ReviewItem";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";
import { app, auth, db } from "../configurations/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ReviewBackDrop = ({ visible, onClose, reviews, productId }) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `reviews/${Date.now()}_${uri.split("/").pop()}`
    );
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleReviewSubmission = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        let listImageUrl = [];
        if (image) {
          const imageUrl = await uploadImage(image);
          listImageUrl = [{ url: imageUrl }];
        }

        const reviewData = {
          userId: user.uid,
          productId: productId,
          rating: rating,
          content: content,
          listImageUrl: listImageUrl,
          createdAt: new Date().toISOString(),
        };

        const reviewRef = doc(collection(db, "reviews"));
        await setDoc(reviewRef, reviewData);

        Alert.alert("Review added successfully");
        // Optionally, you can navigate or update the state to reflect the new review
      } else {
        Alert.alert("No user is logged in");
      }
    } catch (error) {
      Alert.alert("Error adding review");
      console.error("Error adding review: ", error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-400 bg-opacity-50 h-96">
        <ScrollView
          className="bg-white w-full p-5 rounded-md"
          nestedScrollEnabled={true}
        >
          <Text className="text-xl font-bold mb-4">All Reviews</Text>
          <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />

          <View className="w-full items-center">
            <View className="w-full">
              <Text className="text-base font-bold mt-4">
                Care to share more?
              </Text>
              <TextInput
                placeholder="Type your feedback?"
                className="w-full"
                mode="outlined"
                onChangeText={(text) => setContent(text)}
              />
            </View>
            <View className="w-full">
              <Text className="text-base font-bold mt-4">Upload Images</Text>
              <TouchableOpacity
                className="py-2 items-center bg-sky-400 rounded-md w-full"
                onPress={pickImage}
              >
                <Icon source={"plus"} color="white" size={30} />
              </TouchableOpacity>
              {image && (
                <Image
                  source={{ uri: image }}
                  className="w-28 h-28 object-cover mt-4"
                />
              )}
            </View>
            <View className="w-full items-center mt-2 mb-2">
              <AirbnbRating
                showRating={false}
                size={20}
                count={5}
                defaultRating={rating}
                onFinishRating={(value) => setRating(value)}
              />
            </View>
            <TouchableOpacity
              className="w-full bg-sky-400 items-center rounded-md py-2"
              onPress={handleReviewSubmission}
            >
              <Text className=" text-white font-semibold">Submit</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mt-4 p-2 bg-gray-300 rounded-md"
            onPress={onClose}
          >
            <Text className="text-center text-white">Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ReviewBackDrop;
