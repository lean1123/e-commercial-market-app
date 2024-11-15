import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/screen_electronics/Categories";
import ListProduct from "../components/screen_electronics/ListProduct";
import SliderBanner from "../components/screen_electronics/SliderBanner";

export default function Electronics() {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <Header title="Electronics" />
      <SearchBar />
      <Categories />
      <ListProduct />
      <SliderBanner />
    </ScrollView>
  );
}
