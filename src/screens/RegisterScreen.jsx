import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white justify-center">
      {/* <Text>RegisterScreen</Text> */}
      <View className="p-5">
        <Text className="text-lg font-semibold">Register</Text>
        <View className="w-full mt-3">
          <Text>Username</Text>
          <TextInput
            className="border border-gray-300 rounded-lg"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View className="w-full mt-3">
          <Text>Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="w-full mt-3">
          <Text>Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View className="w-full mt-3">
          <Button
            title="Register"
            onPress={async () => {
              setLoading(true);
              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );

                //const { uid } = userCredential.user;

                await updateProfile(auth.currentUser, {
                  displayName: username,
                  photoURL:
                    "https://s33929.pcdn.co/wp-content/uploads/sites/375/2021/06/New-Project-3.png",
                });
                //navigation.navigate("Home", { uid });
              } catch (error) {
                console.log(error);
                alert("Register failed", error.message);
              }
              setLoading(false);
            }}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}
