import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Icon, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../configurations/firebaseConfig";

const CheckOutPage = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItems } = route.params;

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const handleOrderCreation = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const orderDetails = selectedItems.map((item) => ({
          productId: item.productId,
          qty: item.quantity,
          orderPrice: item.price * item.quantity,
        }));

        const orderData = {
          userId: user.uid,
          orderDetails,
          paymentMethod,
          status: "Pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const orderRef = doc(collection(db, "orders"));
        await setDoc(orderRef, orderData);

        // Update product quantities
        // Update product quantities
        for (const item of selectedItems) {
          const productRef = doc(db, "products", item.productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            const newQuantity = productData.quantityInStock - item.quantity;
            await updateDoc(productRef, {
              quantityInStock: newQuantity,
            });
          }
        }

        // Remove purchased items from the cart
        const userId = user.uid;
        const cartRef = doc(db, "carts", userId);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedCartDetails = cartData.cartDetails.filter(
            (cartItem) =>
              !selectedItems.some(
                (item) => item.productId === cartItem.productId
              )
          );
          await updateDoc(cartRef, {
            cartDetails: updatedCartDetails,
          });
        }

        console.log("Order created successfully");
        navigation.navigate("CheckOutStatus", { status: "success" });
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  return (
    <View className="flex flex-col flex-1 justify-center items-center p-5 bg-white">
      {selectedItems.length > 0 && (
        <FlatList
          data={selectedItems}
          renderItem={({ item }) => (
            <View className="w-full border-b border-gray-300 mb-2 py-2">
              <TouchableOpacity className="w-full flex flex-row justify-between items-center">
                <View className="flex-row">
                  <Image
                    source={require("../../assets/iphone.webp")}
                    className="w-20 h-20 mr-6"
                  />
                  <View className="flex flex-col">
                    <Text className="text-lg font-semibold">{item.name}</Text>
                    <Text className="text-gray-400">
                      Lorem ipsum dolor sit.
                    </Text>
                    <Text className="text-black text-base font-semibold">
                      $ {item.price}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col">
                  <TouchableOpacity className="mb-6">
                    <Icon source={"pencil"} size={16} />
                  </TouchableOpacity>
                  <Text>X{item.quantity}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.productId.toString()}
          scrollEnabled={true}
        />
      )}
      <View className="items-center mb-4">
        <Text className="font-semibold text-lg">Total</Text>
        <Text className="font-semibold text-2xl">
          $
          {selectedItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}
        </Text>
      </View>

      <Text className="text-xl font-bold mt-5 mb-2">Payment Methods</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setPaymentMethod(newValue)}
        value={paymentMethod}
      >
        <View className="w-full border-b border-gray-300 mb-2 py-2">
          <TouchableOpacity className="w-full flex flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/paypal-logo.png")}
                className="w-10 h-10 mr-4"
              />
              <Text className="mr-4">PayPal</Text>
            </View>
            <RadioButton value="paypal" />
          </TouchableOpacity>
        </View>
        <View className="w-full border-b border-gray-300 mb-2 py-2">
          <TouchableOpacity className="w-full flex flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/paypal-logo.png")}
                className="w-10 h-10 mr-4"
              />
              <Text className="mr-4">Credit Card</Text>
            </View>
            <RadioButton value="credit-card" />
          </TouchableOpacity>
        </View>
        <View className="w-full border-b border-gray-300 mb-2 py-2">
          <TouchableOpacity className="w-full flex flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/paypal-logo.png")}
                className="w-10 h-10 mr-4"
              />
              <Text className="mr-4">Cash on Delivery</Text>
            </View>
            <RadioButton value="cash" />
          </TouchableOpacity>
        </View>
      </RadioButton.Group>

      {selectedItems.length > 0 && (
        <TouchableOpacity
          className="w-full items-center rounded-md bg-sky-300 py-2 mb-2"
          onPress={handleOrderCreation}
        >
          <View className="flex-row items-center justify-between">
            <Icon source={"cash-multiple"} size={30} color="white" />
            <Text className="text-white text-lg ml-2 font-semibold">
              Pay now
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckOutPage;
