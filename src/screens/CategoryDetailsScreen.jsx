import {
  faArrowRight,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SubCategoryItem from "../components/SubCategoryItem";
import SubTitleItem from "../components/SubTitleItem";
import ProductHorizalCardItem from "../components/ProductHorizalCardItem";
import Header from "../components/Header";
import { ImageSlider } from "react-native-image-slider-banner";

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

const CategoryDetailsScreen = ({ navigation, route }) => {
  const { category } = route.params;

  return (
    <ScrollView className="flex-1 p-5 bg-white item" nestedScrollEnabled={true}>
      <Header title={category.name} />
      <View className="w-full flex-row items-center justify-between mb-5">
        <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
          <FontAwesomeIcon icon={faSearch} />
          <TextInput placeholder="Search for product" className="ml-2 w-full" />
        </View>
        <TouchableOpacity className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md">
          <FontAwesomeIcon icon={faFilter} size={16} />
        </TouchableOpacity>
      </View>
      <SubTitleItem
        title={"Categories"}
        onGetAll={() => {
          alert("Touch");
        }}
      />
      <View>
        <FlatList
          horizontal={true}
          data={list}
          renderItem={({ item }) => <SubCategoryItem />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <View className="flex-row justify-around mb-3">
        <TouchableOpacity className="pt-2 pb-2 pl-5 pr-5 bg-sky-100 rounded-2xl">
          <Text className="text-sky-400 font-bold ">Best Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pt-2 pb-2 pl-5 pr-5 bg-sky-100 rounded-2xl">
          <Text className="text-sky-400 font-bold ">Best Matched</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pt-2 pb-2 pl-5 pr-5 bg-sky-100 rounded-2xl">
          <Text className="text-sky-400 font-bold ">Popular</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        renderItem={({ item }) => <ProductHorizalCardItem />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />

      <TouchableOpacity className="bg-gray-200 rounded-md w-full h-12 justify-center items-center">
        <Text className="font-bold text-gray-400">See All</Text>
      </TouchableOpacity>

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
        onItemChanged={(item) => console.log("item", item)}
        closeIconColor="#fff"
      />
    </ScrollView>
  );
};

export default CategoryDetailsScreen;
