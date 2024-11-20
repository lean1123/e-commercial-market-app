import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../hooks/slices/searchSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";
const product = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
];

export default function ListProduct({ categoryName }) {
  // const { category, subCategory, products, loading, error } = useSelector(
  //   (state) => state.search
  // );
  // const dispatch = useDispatch();
  // const [listProduct, setListProduct] = React.useState(products);
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ category, subCategory }));
    setListProduct(products);
  }, [category, subCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", "Electronics")
        );
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <View className="flex-1 bg-white mt-4">
      {/* <Text>ListProduct</Text> */}
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && products.length === 0 && (
        <Text>No products found.</Text>
      )}
      {!loading && !error && (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem data={item} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      )}
      <TouchableOpacity
        className="bg-gray-200 py-3 rounded-md mt-4"
        onPress={() => alert("See all")}
      >
        <Text className="text-gray-700 text-center">See all</Text>
      </TouchableOpacity>
    </View>
  );
}
