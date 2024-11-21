import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSubCategory } from "../../hooks/slices/searchSlice";

const ElectronicsCategories = [
  {
    id: 1,
    name: "Mobile",
    image: "https://img.icons8.com/ios/452/iphone.png",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
  {
    id: 2,
    name: "Laptop",
    image: "https://img.icons8.com/ios/452/laptop.png",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
  {
    id: 3,
    name: "Headphone",
    image: "https://img.icons8.com/ios/452/headphones.png",
    bgcolor: "#FBD3E9",
    borderColor: "#F973D7",
  },
];

const FashionCategories = [
  {
    id: 1,
    name: "Clothes",
    image: "https://img.icons8.com/ios/452/t-shirt.png",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
  {
    id: 2,
    name: "Shoe",
    image: "https://img.icons8.com/ios/452/sneakers.png",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://img.icons8.com/?size=100&id=48819&format=png&color=000000",
    bgcolor: "#FBD3E9",
    borderColor: "#F973D7",
  },
];

const BeautyCategories = [
  {
    id: 1,
    name: "Makeup",
    image:
      "https://img.icons8.com/?size=100&id=MyV06oafbDPL&format=png&color=000000",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
  {
    id: 2,
    name: "Skincare",
    image:
      "https://img.icons8.com/?size=100&id=PpdHW0TYXWj4&format=png&color=000000",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
  {
    id: 3,
    name: "Haircare",
    image: "https://img.icons8.com/ios/452/hair-dryer.png",
    bgcolor: "#FBD3E9",
    borderColor: "#F973D7",
  },
];

const FreshFruitCategories = [
  {
    id: 1,
    name: "Vegetables",
    image: "https://img.icons8.com/?size=100&id=118888&format=png&color=000000",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
  {
    id: 2,
    name: "Fruits",
    image: "https://img.icons8.com/ios/452/apple.png",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
];

export default function Categories() {
  const [isSeeAll, setIsSeeAll] = React.useState(false);

  const dispatch = useDispatch();
  const { category, subCategory } = useSelector((state) => state.search);

  useEffect(() => {
    switch (category) {
      case "Electronics":
        dispatch(setSubCategory("Mobile"));
        break;
      case "Fashion":
        dispatch(setSubCategory("Clothes"));
        break;
      case "Beauty":
        dispatch(setSubCategory("Makeup"));
        break;
      case "Fresh Fruit":
        dispatch(setSubCategory("Vegetables"));
        break;
      default:
        dispatch(setSubCategory("Mobile"));
    }
  }, []);

  const handleSelectCategory = (name) => {
    dispatch(setSubCategory(name));
    console.log(category);
    console.log(name);
  };

  const handleSeeAll = () => {
    setIsSeeAll(!isSeeAll);
  };

  return (
    <View>
      {/* Header Section */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">Categories</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleSeeAll}
        >
          <Text className="text-gray-500">
            {isSeeAll ? "Show Less" : "See all"}
          </Text>
          <AntDesign name="caretright" size={14} color="gray" />
        </TouchableOpacity>
      </View>

      {/* FlatList Section */}
      <FlatList
        key={isSeeAll ? 2 : 1}
        data={
          category === "Electronics"
            ? ElectronicsCategories
            : category === "Fashion"
            ? FashionCategories
            : category === "Beauty"
            ? BeautyCategories
            : FreshFruitCategories
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectCategory(item.name)}
            className="justify-center items-center rounded-lg mr-5"
            style={{
              backgroundColor: item.bgcolor,
              borderWidth: item.name === subCategory ? 2 : 0,
              borderColor:
                item.name === subCategory ? item.borderColor : "transparent",
              margin: isSeeAll ? 10 : 0,
              width: isSeeAll ? "45%" : 110,
              height: isSeeAll ? 120 : 110,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={!isSeeAll}
        numColumns={isSeeAll ? 2 : 0}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!isSeeAll}
        className="mt-5"
      />

      {/* Levels Section */}
      {/* <View className="flex-row mt-4 justify-between">
        {["Best Sales", "Best Matched", "Popular"].map((level) => (
          <TouchableOpacity
            key={level}
            className="px-4 py-1 rounded-full"
            style={{
              backgroundColor:
                selectedLevel === level ? "#ebfdff" : "transparent",
            }}
            onPress={() => setSelectedLevel(level)}
          >
            <Text
              style={{
                color: selectedLevel === level ? "#39cde0" : "gray",
                fontWeight: selectedLevel === level ? "bold" : "normal",
              }}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
}
