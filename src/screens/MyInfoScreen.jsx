import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebaseConfig";

const avatar =
  "https://img.freepik.com/premium-psd/3d-render-cartoon-avatar-isolated_570939-91.jpg?w=1800";

const features = [
  {
    id: 1,
    title: "My Orders",
    icon: "https://th.bing.com/th/id/R.c0ff976d070a16dcf6c1669616c62ac5?rik=bP1gP3toKBm1yw&pid=ImgRaw&r=0",
    path: "MyOrderScreen",
  },
  {
    id: 2,
    title: "My Wishlist",
    icon: "https://cdn-icons-png.flaticon.com/512/2749/2749667.png",
    path: "MyWishlistScreen",
  },
  {
    id: 3,
    title: "My Reviews",
    icon: "https://icons.iconarchive.com/icons/inipagi/job-seeker/1024/rating-icon.png",
    path: "MyReviews",
  },
  {
    id: 4,
    title: "My Account",
    icon: "https://static.vecteezy.com/system/resources/previews/009/784/908/large_2x/modern-design-icon-of-web-account-vector.jpg",
    path: "MyAccountScreen",
  },
];

const MyInfoScreen = () => {
  const user = auth.currentUser;
  const navigaiton = useNavigation();
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="flex flex-col items-center justify-center mb-8">
        {user.photoURL && (
          <Image src={user.photoURL} className="w-20 h-20 rounded-full" />
        )}
        <Text className="font-bold text-lg mt-2">{user?.displayName}</Text>
        <Text className="text-gray-400">{user.email}</Text>
      </View>
      {/* <Text>MyInfoScreen</Text> */}
      <FlatList
        data={features}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="items-center justify-center flex-1 p-4 border rounded-md border-gray-200"
            key={index}
            onPress={() => {
              navigaiton.navigate(item.path);
            }}
          >
            <Image src={item?.icon} className="w-8 h-8" />
            <Text className="mt-2">{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 20 }}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("logout");
          try {
            auth.signOut();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <View className="bg-red-400 mt-8 rounded-xl flex-row p-2 justify-center items-center">
          <Text className="text-lg font-semibold text-white mr-2">Log out</Text>
          <MaterialCommunityIcons name="logout" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyInfoScreen;
