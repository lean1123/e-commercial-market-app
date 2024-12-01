import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../configurations/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!response.user) {
        console.error("Login failed");
        Alert.alert("Your email or password is invalid!");
        return;
      }

      console.log(response.user.displayName);
    } catch (error) {
      console.log(error);
      Alert.alert("Your email or password is invalid!");
    }
    setLoading(false);
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 p-5 justify-center items-center">
      <Text className="text-2xl font-semibold">Hello!</Text>
      <View className="w-full">
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

      <TouchableOpacity
        className="bg-blue-400 p-2 rounded-lg mt-3 w-full items-center justify-center"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>

      {/* <View className="w-full mt-3">
        <Button
          title="Sign Up"
          onPress={async () => {
            setLoading(true);
            try {
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
          }}
          disabled={loading}
        />
      </View> */}
      <View className="flex-row gap-2 w-full mt-3">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-400">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
