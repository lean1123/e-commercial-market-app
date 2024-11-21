import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../configurations/firebaseConfig";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const data = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
];

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const { active } = useSelector((state) => state.wishlist);

  const [wishlists, setWishlist] = React.useState([]);

  const fetchFavourite = async () => {
    try {
      if (user) {
        const wishlist = doc(db, "wishlists", user.uid);
        const wishlistSnap = await getDoc(wishlist);

        if (wishlistSnap.exists()) {
          const wishlistData = wishlistSnap.data();
          console.log("Wishlist Data:", wishlistData);

          const wishlistItems = wishlistData.wishlistDetails || [];

          const productPromises = wishlistItems.map(async (item) => {
            const productRef = doc(db, "products", item.productId);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
              const productData = productSnap.data();
              return {
                ...item,
                name: productData.name,
                image: productData.image || [],
                id: productSnap.id,
              };
            } else {
              console.warn(`Product not found: ${item.productId}`);
              return { ...item, name: "Unknown Product", image: [] };
            }
          });

          const productsWithDetails = await Promise.all(productPromises);
          setWishlist(productsWithDetails);
        }
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFavourite();
  }, [active]);

  const handleRemove = async (item) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const wishlistRef = doc(db, "wishlists", user.uid);
        await updateDoc(wishlistRef, {
          wishlistDetails: arrayRemove({
            productId: item.productId,
          }),
        });
        console.log("Product removed from wishlist");
        fetchFavourite();
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.error("Error removing product from wishlist: ", error);
    }
  };

  const handleToggle = async (item) => {
    const productDoc = doc(db, "products", item.id);
    const productSnap = await getDoc(productDoc);
    if (productSnap.exists()) {
      const productData = productSnap.data();
      console.log("Product found: ", productSnap.data());
      navigation.navigate("ProductDetail", { data: productData });
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <FlatList
        data={wishlists}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row justify-between items-center p-4 border rounded-md border-gray-200 mb-2"
            onPress={() => handleToggle(item)}
            key={item.id}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: item?.image[0] }}
                className="w-16 h-16 rounded-lg"
              />
              <View className="ml-4">
                <Text className="font-bold text-lg">
                  {item.name.length > 20
                    ? `${item.name.substring(0, 20)}...`
                    : item.name}
                </Text>
                <Text className="text-gray-400">{item.price}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Text className="text-red-500">Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default FavouriteScreen;
