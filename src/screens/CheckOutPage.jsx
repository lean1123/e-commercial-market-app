import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, RadioButton } from "react-native-paper";
import { auth, db } from "../configurations/firebaseConfig";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchNumOfUnreadNotifications } from "../hooks/slices/notificationSlice";
import { chatSession } from "../configurations/AIModel";

const createPrompt = (messages) => {
  messages = JSON.stringify(messages, null, 2);
  const prompt = `
  You are an AI specialized in generating user-friendly and professional notification messages for e-commerce platforms. Based on the provided order data, generate a notification message to inform the user about their order details.

  Order data: 
  ${messages}
  

Your task:
1. Create a concise notification message to inform the user about their order.
2. Include details such as the order status, total price, payment method, and date of order.
3. Format the message to be friendly and professional.
4. Use Vietnamese language.
5. The currency should be in $.
`;

  return prompt;
};

const CheckOutPage = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  //   const { selectedItems } = route.params;

  const { selectedItems, totalPrice } = route.params;

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCreateContentNotification = async (orderData) => {
    try {
      const result = await chatSession.sendMessage(createPrompt(orderData));
      return result.response.text();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      console.log("Content notification created successfully");
    }
  };

  const handleOrderCreation = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (!paymentMethod) {
          Alert.alert("Error", "Please select a payment method.");
          return;
        }
        // Check if the ordered quantity exceeds the available stock
        for (const item of selectedItems) {
          const productRef = doc(db, "products", item.productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            if (item.quantity > productData.quantityInStock) {
              Alert.alert(
                "Error",
                `Ordered quantity for ${item.name} exceeds available stock.`
              );
              return;
            }
          } else {
            Alert.alert("Error", `Product ${item.name} not found.`);
            return;
          }
        }

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
          totalPrice: totalPrice,
        };

        console.log("Order data: ", orderData);

        const orderRef = doc(collection(db, "orders"));

        setDoc(orderRef, orderData);

        orderData.orderId = orderRef.id;

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

        // Create notification content
        const notificationContent = await handleCreateContentNotification(
          orderData
        );

        // Create notification
        const notificationRef = doc(collection(db, "notifications"));
        await setDoc(notificationRef, {
          userId: user.uid,
          title: "Order Successfully",
          message: notificationContent,
          read: false,
          createdAt: moment(Date.now()).format("hh:mm:ss DD/MM/YYYY"),
        });

        dispatch(fetchNumOfUnreadNotifications({ userId: user.uid }));

        console.log("Order created successfully");
        navigation.navigate("CheckOutStatus", { status: "success" });
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
      navigation.navigate("CheckOutStatus", { status: "failed" });
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
                  <TouchableOpacity
                    className="mb-6"
                    onPress={() => navigation.navigate("CartScreen")}
                  >
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
