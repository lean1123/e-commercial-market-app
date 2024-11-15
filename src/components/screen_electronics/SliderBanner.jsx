import { View, Text } from "react-native";
import React from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { height } from "@fortawesome/free-regular-svg-icons/faAddressBook";

export default function SliderBanner() {
  return (
    <View
      style={{
        marginTop: 20,
        height: 200,
      }}
    >
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
        autoPlay={false}
        caroselImageStyle={{
          height: 170,
          width: 370,
          borderRadius: 20,
          borderWidth: 1,
        }}
        caroselContainerStyle={{ width: "100%", height: 170 }}
        showIndicator
        indicatorContainerStyle={{ top: 30 }}
      />
    </View>
  );
}
