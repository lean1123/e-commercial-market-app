import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styled } from "nativewind";
import React from "react";
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

const StyledText = styled(Text);

var listCategory = [
  {
    id: 1,
    picUrl: "https://picsum.photos/200/300",
    name: "Product 1",
  },
  { id: 2, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
  { id: 3, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
  { id: 4, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
  { id: 5, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
  { id: 6, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
  { id: 7, picUrl: "https://picsum.photos/200/300", name: "Product 1" },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <Header title="Home" />
      <View className="w-full flex-row items-center justify-between mb-5">
        <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
          <FontAwesomeIcon icon={faSearch} />
          <TextInput placeholder="Search for product" className="ml-2 w-full" />
        </View>
        <TouchableOpacity className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md">
          <FontAwesomeIcon icon={faFilter} size={16} />
        </TouchableOpacity>
      </View>
      <View className="mb-5">
        <FlatList
          data={listCategory}
          renderItem={({ item }) => (
            <CategoryItem className="items-center" category={item} />
          )}
          horizontal={true}
          className="w-full"
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
        <TouchableOpacity className="p-2 bg-slate-300 rounded-md">
          <Text>View all</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-5">
        <FlatList
          data={listCategory}
          renderItem={({ item }) => <ProductCardItem product={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="w-full"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
