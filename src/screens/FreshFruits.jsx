import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../components/Header";
import SliderBanner from "../components/screen_category_detail/SliderBanner";
import SearchBar from "../components/SearchBar";
import FreshFruitsItem from "../components/screen_freshfruits/FreshFruitsItem";
import RelevantProducts from "../components/screen_freshfruits/RelevantProducts";

const data = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
];

export default function FreshFruits({ type }) {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      {/* <Header title="Fresh Fruits" /> */}
      <SearchBar />
      {type === "home" && <SliderBanner />}
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <FreshFruitsItem data={item} key={index} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        //nestedScrollEnabled={true}
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 20,
        }}
      />
      <RelevantProducts />
    </ScrollView>
  );
}
