import { View, Text, TextInput, Touchable, Button } from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View className="flex-1 p-5">
      <Text className="text-lg font-semibold">Login</Text>
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
      <View className="w-full mt-3">
        <Button
          title="Login"
          onPress={async () => {
            setLoading(true);
            try {
              const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
              console.log(response);
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
          }}
          disabled={loading}
        />
      </View>
      <View className="w-full mt-3">
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
      </View>
    </View>
  );
}