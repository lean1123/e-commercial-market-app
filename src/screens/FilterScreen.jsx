import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import FilterSubtitleItem from "../components/FilterSubtitleItem";
import { setRangePrice, setRating } from "../hooks/slices/searchSlice";

const FilterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { rangePrice, rating } = useSelector((state) => state.search);

  const [value, setValue] = useState({
    values: [rangePrice[0], rangePrice[1]],
  });
  const [rate, setRate] = useState(rating);
  const multiSliderValuesChange = (values) => {
    setValue({
      values,
    });
    dispatch(setRangePrice([values[0], values[1]]));
    console.log(values);
  };

  const handleRating = (value) => {
    setRate(value);
    dispatch(setRating(value));
    console.log(value);
  };

  const handleApply = () => {
    dispatch(setRangePrice(value.values));
    dispatch(setRating(rate));
    console.log("value", value.values);
    navigation.goBack();
  };

  return (
    <View className="flex-1 items-center p-5 bg-white">
      <View className="w-full flex-row items-center justify-between p-4 border-b border-gray-300">
        <View className="flex-1">
          <Text className="text-xl font-bold">Filter</Text>
        </View>
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesomeIcon icon={faClose} size={24} />
        </TouchableOpacity>
      </View>

      {/* <FilterSubtitleItem title={"Shipping options"} /> */}

      {/* <View className="w-full items-start border-b border-gray-300">
        <Checkbox.Item
          label="Instant (2 hours delivery)"
          status="unchecked"
          position="leading"
          style={{ marginLeft: -22 }}
        />
        <Checkbox.Item
          label="Express (2 days delivery)"
          status="unchecked"
          position="leading"
          style={{ marginLeft: -22 }}
        />
        <Checkbox.Item
          label="Standard (7-10 days delivery)"
          status="unchecked"
          position="leading"
          style={{ marginLeft: -22 }}
        />
      </View> */}

      <FilterSubtitleItem title={"Price range"} />

      <View className="w-full items-center border-b border-gray-300">
        <View className="flex-row justify-between w-full">
          <TextInput
            label={value.values[0].toString()}
            mode="outlined"
            style={{ width: "30%", height: 40 }}
            left={<TextInput.Icon icon={"currency-usd"} />}
          />
          <TextInput
            label={value.values[1].toString()}
            mode="outlined"
            style={{ width: "30%", height: 40 }}
            left={<TextInput.Icon icon={"currency-usd"} />}
          />
        </View>
        <MultiSlider
          values={[value.values[0], value.values[1]]}
          sliderLength={250}
          selectedStyle={{ backgroundColor: "#3ed7f8" }}
          containerStyle={{ alignSelf: "center", marginTop: -10 }}
          onValuesChange={multiSliderValuesChange}
          markerStyle={{
            height: 13,
            width: 13,
            borderRadius: 50,
            backgroundColor: "#3ed7f8",
          }}
          min={0}
          max={5000}
          step={100}
        />
      </View>
      <FilterSubtitleItem title={"Average review"} />
      <View className="w-full flex flex-row justify-center items-center border-b border-gray-300 py-4">
        <AirbnbRating
          showRating={false}
          size={20}
          defaultRating={rate}
          // onValuesChange={(rating) => {
          //   handleRating(rating);
          // }}
          onFinishRating={(rating) => {
            handleRating(rating);
          }}
        />

        <TouchableOpacity
          className="items-center py-2 px-1 bg-blue-400 rounded-lg ml-2"
          onPress={() => {
            dispatch(setRating(0));
            setRate(0);
          }}
        >
          <Text className="text-white text-sm font-medium">Reset rating</Text>
        </TouchableOpacity>
        {/* <Text className="ml-2">& Up</Text> */}
      </View>

      {/* <FilterSubtitleItem title={"Orthers"} />
      <View className="w-full items-center mt-2">
        <View className="w-full flex-row justify-between items-center px-2">
          <OrtherFilterSubItem
            title={"30-days Free return"}
            iconName={"keyboard-return"}
          />
          <OrtherFilterSubItem
            title={"Buyer Protection"}
            iconName={"shield-sun-outline"}
          />
        </View>
        <View className="w-full flex-row justify-between items-center px-2 mt-5">
          <OrtherFilterSubItem title={"Best deal"} iconName={"label"} />
          <OrtherFilterSubItem
            title={"Ship to store"}
            iconName={"map-marker-outline"}
          />
        </View>
      </View> */}
      <View className="w-full flex-row justify-center items-center mt-5">
        <TouchableOpacity
          className="bg-sky-300 rounded-md w-1/2 flex-row items-center justify-center py-3"
          onPress={() => {
            handleApply();
          }}
        >
          <Text className="text-white text-base font-semibold">Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;
