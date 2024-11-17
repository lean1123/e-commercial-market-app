import React, { useState } from "react";
import {
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

const ReviewBackDrop = ({ visible, onClose, reviews }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
        <ScrollView className="bg-white w-full p-5 rounded-md">
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
              <AirbnbRating showRating={false} size={20} />
            </View>
            <TouchableOpacity className="w-full bg-sky-400 items-center rounded-md py-2">
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
