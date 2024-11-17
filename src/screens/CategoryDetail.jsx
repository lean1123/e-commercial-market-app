import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/screen_category_detail/Categories";
import ListProduct from "../components/screen_category_detail/ListProduct";
import SliderBanner from "../components/screen_category_detail/SliderBanner";

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

export default function CategoryDetail() {
  return (
    <ScrollView className="flex-1 p-5 bg-white ">
      {/* <Header title="Electronics" /> */}
      <SearchBar />
      <Categories />
      <ListProduct />
      <SliderBanner data={image} />
    </ScrollView>
  );
}
