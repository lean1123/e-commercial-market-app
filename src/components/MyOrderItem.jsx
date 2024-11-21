import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db } from "../configurations/firebaseConfig";

export default function MyOrderItem({ item }) {
  const [showDetails, setShowDetails] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState([]);

  const fetchProductOrderDetails = async () => {
    setOrderDetails([]);
    try {
      for (let i = 0; i < item.orderDetails.length; i++) {
        const orderDetail = item.orderDetails[i];
        console.log("Order detail: ", orderDetail);

        // Log giá trị productId
        console.log(
          "Product ID: ",
          orderDetail.productId,
          typeof orderDetail.productId
        );

        // Query Firestore
        const productRef = doc(db, "products", orderDetail.productId);
        const querySnapshot = await getDoc(productRef);

        // Kiểm tra kết quả
        if (!querySnapshot.empty) {
          const product = querySnapshot.data();
          console.log("Product: ", product);

          // Kết hợp dữ liệu
          const mergedDetail = {
            ...orderDetail,
            productImage: product.image ? product.image[0] : null,
            productName: product.name || "Unknown",
          };

          setOrderDetails((prev) => [...prev, mergedDetail]);
        } else {
          console.error("No product found for ID: ", orderDetail.productId);
        }
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      fetchProductOrderDetails();
    }
  };
  return (
    <View className="w-full border rounded-sm border-gray-300 mt-3 p-5 justify-between">
      {/* <View className="flex-row justify-between items-end"> */}
      <Text className="text-base font-semibold">ID: {item?.id}</Text>
      <Text className="text-gray-500">{item?.createdAt}</Text>
      {/* </View> */}
      {/* <View className="flex-row justify-between"> */}
      <Text>Status: {item?.status}</Text>
      <Text>Payment Method: {item?.paymentMethod}</Text>
      {/* </View> */}
      <View className="flex-row justify-between items-end">
        <Text className="text-lg font-medium text-cyan-500">Total: $100</Text>
        <TouchableOpacity
          className="rounded-md bg-slate-200 p-1"
          onPress={handleViewDetails}
        >
          <Text className="text-blue-500">View Details</Text>
        </TouchableOpacity>
      </View>
      {showDetails && (
        <FlatList
          data={orderDetails}
          renderItem={({ item }) => (
            <>
              <View className="border-t border-gray-300 mt-2 p-2 flex-row justify-between">
                <View className="flex-row">
                  <Image
                    source={{
                      uri:
                        item.productImage || "https://via.placeholder.com/150",
                    }}
                    className="w-16 h-16 rounded-lg"
                  />
                  <View className="ml-4">
                    <Text className="font-bold text-lg">
                      {item.productName}
                    </Text>
                    <Text className="text-gray-400">
                      Price: ${item.orderPrice}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-2xl">x{item.qty}</Text>
                </View>
              </View>
            </>
          )}
        />
      )}
    </View>
  );
}
