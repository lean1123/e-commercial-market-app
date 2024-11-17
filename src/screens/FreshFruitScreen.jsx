import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ImageSlider } from "react-native-image-slider-banner";
import ProductHorizalCardItem from "../components/ProductHorizalCardItem";
import SubTitleItem from "../components/SubTitleItem";
import ProductVerticalItem from "../components/ProductVerticalItem";
import SearchBarItem from "../components/SearchBarItem";

const list = [
  { id: 1, imageUrl: "https://picsum.photos/200/300" },
  { id: 2, imageUrl: "https://picsum.photos/200/300" },
  {
    id: 3,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/200/300",
  },
];

const FreshFruitScreen = () => {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 10 }}
      nestedScrollEnabled={true}
    >
      <Header title={"Fresh Fruits"} />
      <SearchBarItem />
      <ImageSlider
        data={[
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
        ]}
        autoPlay={true}
        closeIconColor="#fff"
      />

      <FlatList
        data={list}
        renderItem={({ item }) => <ProductVerticalItem />}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ marginBottom: 20 }}
      />

      <TouchableOpacity className="bg-gray-200 rounded-md w-full h-12 justify-center items-center mb-6">
        <Text className="font-bold text-gray-400">See All</Text>
      </TouchableOpacity>

      <SubTitleItem title={"Relevant products"} />

      <FlatList
        data={list}
        renderItem={({ item }) => <ProductHorizalCardItem />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={{ marginBottom: 20 }}
      />
    </ScrollView>
  );
};

export default FreshFruitScreen;
