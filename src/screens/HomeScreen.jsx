import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styled } from "nativewind";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryItem from "../components/CategoryItem";
import ProductMainBanner from "../components/ProductBanner";
import ProductSubBanner from "../components/ProductSubBanner";
import ProductCardItem from "../components/ProductCardItem";
import Header from "../components/Header";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../configurations/firebaseConfig";

const StyledText = styled(Text);

var listCategory = [
  {
    id: 1,
    picUrl:
      "https://th.bing.com/th/id/R.fe521fc082526d2881fabcaf9147d651?rik=ilc%2bV%2bCKcgdfIg&pid=ImgRaw&r=0",
    name: "Electronics",
    bg: "bg-purple-100",
  },
  {
    id: 2,
    picUrl:
      "https://th.bing.com/th/id/R.4414333b37828ff48249bd4c022ce89f?rik=f6MqiPMNIJc%2fzw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fshoes-transparent%2fshoes-transparent-21.png&ehk=jQ1%2bV8wZ19lDYce6H6BQVtMqASEu4SdzQHKYTNRiqJw%3d&risl=1&pid=ImgRaw&r=0",
    name: "Fashion",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    picUrl:
      "https://png.pngtree.com/png-clipart/20231002/original/pngtree-beauty-lipstick-png-image_13060322.png",
    name: "Beauty",
    bg: "bg-orange-100",
  },
  {
    id: 4,
    picUrl:
      "https://th.bing.com/th/id/R.bdee052ec8b3ae1c43ca3e16c2e3e903?rik=w3P0X6JP%2f%2bOiOQ&pid=ImgRaw&r=0",
    name: "Fresh Fruit",
    bg: "bg-green-100",
  },
];

const HomeScreen = ({ navigation }) => {
  const [recommendedProducts, setRecommendedProducts] = React.useState([]);
  const fetchRecommendedProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("createDate", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setRecommendedProducts(products);
    } catch (error) {
      console.error("Error fetching recommended products: ", error);
    }
  };
  useEffect(() => {
    fetchRecommendedProducts();
    console.log("Recommended products: ", recommendedProducts);
  }, []);
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      {/* <Header title="Home" /> */}
      {/* <View className="w-full flex-row items-center justify-between mb-5">
        <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
          <FontAwesomeIcon icon={faSearch} />
          <TextInput placeholder="Search for product" className="ml-2 w-full" />
        </View>
        <TouchableOpacity
          className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md"
          onPress={() => navigation.navigate("FilterScreen")}
        >
          <FontAwesomeIcon icon={faFilter} size={16} />
        </TouchableOpacity>
      </View> */}
      <View className="mb-5">
        <FlatList
          data={listCategory}
          renderItem={({ item }) => (
            <CategoryItem className="items-center" category={item} />
          )}
          horizontal={true}
          scrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          className="w-full"
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="rounded-t-md rounded-b-md overflow-hidden w-full mb-5">
        <ProductMainBanner />
        <View className="w-full flex-row justify-between mt-2 h-24">
          <View className="w-1/2 mr-2">
            <ProductSubBanner />
          </View>
          <View className="w-1/2">
            <ProductSubBanner />
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold text-xl">Recommended for you</Text>
        <TouchableOpacity className="">
          <Text className="text-sm font-semibold text-gray-500">View all</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-5">
        <FlatList
          data={recommendedProducts}
          renderItem={({ item }) => <ProductCardItem product={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
