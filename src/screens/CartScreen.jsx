import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import CartItem from "../components/CartItem";
import { auth, db } from "../configurations/firebaseConfig";

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();

  const cartMap = useMemo(() => {
    return new Map(cartDetails.map((item) => [item.productId, item]));
  }, [cartDetails]);

  const totalPrice = useMemo(() => {
    if (selectedItems.length === 0) return 0;

    return selectedItems.reduce((sum, selectedItem) => {
      const cartItem = cartMap.get(selectedItem.productId);
      return cartItem ? sum + cartItem.price * cartItem.quantity : sum;
    }, 0);
  }, [cartMap, selectedItems]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            const cartItems = cartData.cartDetails || [];

            const productsWithDetails = await Promise.all(
              cartItems.map(async (item) => {
                const productRef = doc(db, "products", item.productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                  return { ...item, ...productSnap.data() };
                }
                return { ...item, name: "Unknown Product" };
              })
            );

            setCartDetails(productsWithDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      } finally {
        setIsUpdated(false);
      }
    };

    fetchCartDetails();
  }, [isUpdated]);

  const updateCartQuantity = async (item, newQuantity) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(db, "carts", user.uid);

        // Fetch the current cart details
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedCartDetails = cartData.cartDetails.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          );

          // Update the cart with the new item
          await updateDoc(cartRef, {
            cartDetails: updatedCartDetails,
          });

          // Update the local state

          // setCartDetails(updatedCartDetails);

          if (selectedItems.length > 0) {
            setSelectedItems((prevItems) =>
              prevItems.map((selectedItem) =>
                selectedItem.productId === item.productId
                  ? { ...selectedItem, quantity: newQuantity }
                  : selectedItem
              )
            );
          }

          setIsUpdated(true);

          console.log("Cart updated");
        }
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateCartQuantity(item, newQuantity);
    }
  };
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.some((i) => i.productId === item.productId)) {
        return prevItems.filter((i) => i.productId !== item.productId);
      } else {
        return [...prevItems, item];
      }
    });
  };

  return (
    <ScrollView
      className="flex flex-col flex-1 p-5 bg-white"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <FlatList
        data={cartDetails}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onCheckboxChange={handleCheckboxChange}
            handleQuantityChange={handleQuantityChange}
          />
        )}
        keyExtractor={(item) => item.productId?.toString()}
        contentContainerStyle={{ marginTop: 40 }}
        scrollEnabled={false}
      />

      <View className="w-full flex-row justify-between my-4">
        <Text className="text-base font-semibold">TOTAL</Text>
        <Text className="text-lg font-bold">${totalPrice}</Text>
      </View>

      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4"
        onPress={() => {
          navigation.navigate("CheckOutPage", { selectedItems, totalPrice });
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">Next</Text>
        <Icon source={"arrow-right"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;
