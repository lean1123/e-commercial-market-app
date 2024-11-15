import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import FilterSubtitleItem from "../components/FilterSubtitleItem";

const FilterScreen = () => {
  const [value, setValue] = useState({ values: [0, 37] });
  const multiSliderValuesChange = (values) => {
    setValue({
      values,
    });
  };

  return (
    <View className="flex-1 items-center p-5 bg-white">
      <View className="w-full flex-row items-center justify-between p-4 border-b border-gray-300">
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold">Filter</Text>
        </View>
        <TouchableOpacity className="p-2">
          <FontAwesomeIcon icon={faClose} size={16} />
        </TouchableOpacity>
      </View>

      <FilterSubtitleItem title={"Shipping options"} />

      <View className="w-full items-start border-b border-gray-300">
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
      </View>

      <FilterSubtitleItem title={"Price range"} />

      <View className="w-full items-center border-b border-gray-300">
        <View className="flex-row justify-between w-full">
          <TextInput
            label="10"
            mode="outlined"
            style={{ width: "30%", height: 40 }}
            left={<TextInput.Icon icon={"currency-usd"} />}
          />
          <TextInput
            label="1000"
            mode="outlined"
            style={{ width: "30%", height: 40 }}
            left={<TextInput.Icon icon={"currency-usd"} />}
          />
        </View>
        <MultiSlider
          values={[value.values[0], value.values[1]]}
          sliderLength={200}
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
          max={37}
          step={1}
        />
      </View>
    </View>
  );
};

export default FilterScreen;
