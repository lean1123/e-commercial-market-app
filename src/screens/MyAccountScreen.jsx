import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../configurations/firebaseConfig";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserInfo({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        } else {
          console.log("No user is logged in");
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      {userInfo.photoURL && (
        <Image source={{ uri: userInfo.photoURL }} style={styles.image} />
      )}
      <Text style={styles.label}>Name: {userInfo.displayName}</Text>
      <Text style={styles.label}>Email: {userInfo.email}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
});

export default MyAccountScreen;
