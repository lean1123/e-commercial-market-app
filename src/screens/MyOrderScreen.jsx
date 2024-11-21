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
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import MyOrderItem from "../components/MyOrderItem";

// import { collection, getDocs, query, where } from "firebase/firestore";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    quantity: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 40,
    quantity: 3,
  },
];

const MyOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const user = auth.currentUser;

  const fetchOrders = async () => {
    try {
      if (user) {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const orderData = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Chuyển đổi các Timestamp thành chuỗi
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate().toLocaleString(), // Chuyển `createdAt` thành chuỗi
            updatedAt: data.updatedAt.toDate().toLocaleString(), // Chuyển `updatedAt` thành chuỗi
          };
        });

        setOrders(orderData);
      } else {
        console.error("User is not logged in");
      }
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const user = auth.currentUser;
  //         if (user) {
  //           const q = query(
  //             collection(db, "orders"),
  //             where("userId", "==", user.uid)
  //           );
  //           const querySnapshot = await getDocs(q);
  //           const ordersList = querySnapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }));
  //           setOrders(ordersList);
  //         } else {
  //           console.log("No user is logged in");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching orders: ", error);
  //       }
  //     };

  //     fetchOrders();
  //   }, []);

  return (
    <ScrollView
      className="flex-1 p-5 bg-white"
      nestedScrollEnabled={true}
      contentContainerStyle={{ padding: 5 }}
      // contentContainerStyle={{ alignItems: "center" }}
    >
      {/* <Text className="text-2xl font-bold mb-4">My Orders</Text> */}
      <FlatList
        data={orders}
        renderItem={({ item }) => <MyOrderItem item={item} key={item.id} />}
        //         renderItem={({ item }) => <CartItem item={item} />}

        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />

      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4 mb-8"
        onPress={() => {
          navigation.navigate("myInfoScreen");
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">
          BACK TO MY PROFILE
        </Text>
        <Icon source={"arrow-left"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyOrderScreen;
