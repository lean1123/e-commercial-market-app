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

const list = [
  { id: 1 },
  { id: 2 },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

const CategoryDetailsScreen = ({ navigation, route }) => {
  const { category } = route.params;

  return (
    <ScrollView className="flex-1 p-5 bg-white">
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
          alert("Touched");
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

      <View className="mb-10">
        {list.map((item) => (
          <ProductHorizalCardItem key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryDetailsScreen;
