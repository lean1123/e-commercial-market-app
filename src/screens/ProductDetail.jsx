import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import Header from "../components/Header";
import SliderBanner from "../components/screen_category_detail/SliderBanner";
import { Feather } from "@expo/vector-icons";
import Reviews from "../components/Reviews";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../configurations/firebaseConfig";

const image = [
  {
    img: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg",
  },
  {
    img: "https://cdn6.f-cdn.com/contestentries/950453/21854765/58a0c9942f82f_thumb900.jpg",
  },
  {
    img: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg",
  },
  {
    img: "https://cdn6.f-cdn.com/contestentries/950453/21854765/58a0c9942f82f_thumb900.jpg",
  },
];

export default function ProductDetail({ type, route }) {
  const { data } = route.params;

  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(data?.color[0]);
  const [selectedSize, setSelectedSize] = React.useState(data?.size[0]);

  const addToCart = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const productRef = doc(db, "products", data.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          if (quantity > productData.quantityInStock) {
            Alert.alert("Error", "Ordered quantity exceeds available stock.");
            return;
          }

          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            const existingItem = cartData.cartDetails.find(
              (cartItem) => cartItem.productId === data.id
            );

            if (existingItem) {
              // Increase the quantity of the existing item
              const newQuantity = existingItem.quantity + quantity;
              const updatedCartDetails = cartData.cartDetails.map((cartItem) =>
                cartItem.productId === data.id
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              );

              // Update the cart with the new item
              await updateDoc(cartRef, {
                cartDetails: updatedCartDetails,
              });
            } else {
              // Add the new item to the cart
              await updateDoc(cartRef, {
                cartDetails: arrayUnion({
                  productId: data.id,
                  quantity: quantity,
                  price: data.price,
                }),
              });
            }
          } else {
            // Add the new item to the cart
            await updateDoc(cartRef, {
              cartDetails: arrayUnion({
                productId: data.id,
                quantity: quantity,
                price: data.price,
              }),
            });
          }

          Alert.alert("Product added to cart");
        } else {
          Alert.alert("Error", "Product not found.");
        }
      } else {
        Alert.alert("Error", "No user is logged in.");
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      Alert.alert("Error", "Failed to add product to cart.");
    }
  };

  return (
    <ScrollView className="flex-1 p-5 bg-white">
      {/* <Header title="Product Detail" /> */}
      <SliderBanner data={image} />
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-3xl font-bold text-cyan-400">${data?.price}</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 flex-row items-center justify-center">
          <Feather name="heart" size={20} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-start">
        <View className="">
          <Text className="text-xl font-bold">{data?.name}</Text>
          <Text className="text-sm text-gray-500">(99 reviews)</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold">⭐ {data?.rating}</Text>
        </View>
      </View>
      <View className="w-full h-[1px] bg-gray-100 my-6"></View>
      {/* Description */}
      <View>
        <View className="w-full flex-row items-center">
          <Text className="text-lg font-bold mr-2">Quantity in stock:</Text>
          <Text className="text-lg text-gray-500">{data?.quantityInStock}</Text>
        </View>
        <Text className="text-lg font-bold">Description</Text>
        <Text className="text-lg text-gray-500 mt-3">{data?.description}</Text>
      </View>
      {/* option */}
      {type === "clothes" && (
        <View className="">
          <View className="mt-4">
            <Text className="text-lg font-semibold">Color</Text>
            {/* color */}
            <View className="flex-row mt-2">
              {data?.color.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-8 h-8 rounded-full border-gray-200 mr-4"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === color ? "cyan" : "gray",
                    borderWidth: selectedColor === color ? 4 : 1,
                  }}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>
          {/* size */}
          <View className="mt-4">
            <Text className="text-lg font-semibold">Size</Text>
            <View className="flex-row mt-2">
              {data?.size.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-8 h-8 rounded-full border-[1px] border-gray-200 mr-4 flex-row items-center justify-center"
                  style={{
                    backgroundColor: selectedSize === size ? "cyan" : "white",
                    borderColor: selectedSize === size ? "cyan" : "gray",
                  }}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      <View className="mt-4">
        <Text className="text-lg font-semibold">Quantity</Text>
        <View className="flex-row justify-between items-end">
          <View className="flex-row mt-2 items-center">
            <TouchableOpacity
              className="w-8 h-8 rounded-md bg-gray-100 flex-row items-center justify-center"
              onPress={() => {
                quantity > 1 && setQuantity(quantity - 1);
              }}
            >
              <Feather name="minus" size={16} />
            </TouchableOpacity>
            <Text className="mx-4">{quantity}</Text>
            <TouchableOpacity
              className="w-8 h-8 rounded-md bg-gray-100 flex-row items-center justify-center"
              onPress={() => setQuantity(quantity + 1)}
            >
              <Feather name="plus" size={16} />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 items-end">
            <Text className="text-base font-light">Total</Text>
            <Text className="text-xl font-bold">${data?.price * quantity}</Text>
          </View>
        </View>
      </View>

      <Reviews />

      <View className="flex-1 flex-row justify-start mb-10 gap-4">
        <TouchableOpacity
          className="flex-row flex-1 justify-center items-center gap-1 bg-white rounded-md p-3 border border-cyan-500"
          onPress={addToCart}
        >
          <MaterialIcons name="add-shopping-cart" size={24} color="cyan" />
          <Text className="text-cyan-500 text-base font-semibold">
            ADD TO CART
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
