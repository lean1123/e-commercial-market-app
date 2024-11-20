import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../configurations/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            console.log("Cart Data:", cartData);

            const cartItems = cartData.cartDetails || [];

            const productPromises = cartItems.map(async (item) => {
              const productRef = doc(db, "products", item.productId);
              const productSnap = await getDoc(productRef);
              if (productSnap.exists()) {
                const productData = productSnap.data();
                return { ...item, name: productData.name };
              }
              return item;
            });

            const productsWithDetails = await Promise.all(productPromises);
            setCartDetails(productsWithDetails);
          }
        } else {
          console.log("No user is logged in");
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    fetchCartDetails();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedItems]);

  const updateCartQuantity = async (item, newQuantity) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(db, "carts", user.uid);

        await updateDoc(cartRef, {
          cartDetails: arrayRemove(item),
        });

        await updateDoc(cartRef, {
          cartDetails: arrayUnion({
            ...item,
            quantity: newQuantity,
          }),
        });

        setCartDetails((prevItems) =>
          prevItems.map((i) =>
            i.productId === item.productId ? { ...i, quantity: newQuantity } : i
          )
        );

        console.log("Cart updated");
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.error("Error updating cart: ", error);
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
        keyExtractor={(item, index) => item.productId?.toString()}
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
          navigation.navigate("CheckOutPage", { selectedItems });
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">Next</Text>
        <Icon source={"arrow-right"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;
