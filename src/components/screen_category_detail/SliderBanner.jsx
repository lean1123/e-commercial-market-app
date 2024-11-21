import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ImageSlider } from "react-native-image-slider-banner";

export default function SliderBanner({ data }) {
  const [images, setImages] = React.useState([]);
  useEffect(() => {
    if (data && data.length > 0 && data[0]?.img === undefined) {
      const formattedData = data.map((item) => ({ img: item }));
      setImages(formattedData);
    } else {
      setImages(data);
    }
  }, [data]);
  return (
    <View
      style={{
        marginTop: 20,
        height: 200,
        marginBottom: 15,
      }}
    >
      <ImageSlider
        data={images}
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
